import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/users.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {Model, ObjectId} from "mongoose";
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from 'bcryptjs'
import {AddFriendUserDto} from "./dto/addFriend-user.dto";


@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userModel.create(dto)
        return user
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).populate('deeds')
        return user
    }

    async getUserByNickname(nickname: string): Promise<User> {
        const user = await this.userModel.findOne({ nickname }).populate('deeds')
        return user
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id)
        return user.id
    }

    async update(dto: UpdateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(dto.password, 5)

        const user = await this.userModel.findByIdAndUpdate(dto._id, {
            nickname: dto.nickname,
            name: dto.name,
            email: dto.email,
            password: hashPassword
        }, {new: true})
        return user
    }

    async addFriend(dto: AddFriendUserDto): Promise<User> {
        const user = await this.userModel.findById(dto.id)
        if(user.friends.includes(dto.nickname)) {
            throw new HttpException('Пользователь с таким nickname уже добавлен', HttpStatus.BAD_REQUEST)
        }
        user.friends.push(dto.nickname)
        await user.save()
        const friend = await this.userModel.findOne({nickname: dto.nickname}).populate('deeds')
        return friend
    }

    async getAllFriends(id: ObjectId): Promise<User[]> {
        const user = await this.userModel.findById(id)
        const friends = await Promise.all(
            user.friends.map(friend => {
                return this.userModel.findOne({nickname: friend}).populate('deeds')
            })
        )
        return friends
    }
}
