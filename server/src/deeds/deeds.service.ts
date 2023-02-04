import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Deed, DeedDocument} from "./schemas/deeds.schema";
import {CreateDeedDto} from "./dto/create-deed.dto";
import {User, UserDocument} from "../users/schemas/users.schema";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {UpdateDeedDto} from "./dto/update-deed.dto";

@Injectable()
export class DeedsService {
    constructor(@InjectModel(Deed.name) private deedModel: Model<DeedDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async createDeed(dto: CreateDeedDto): Promise<Deed> {
        const deed = await this.deedModel.create(dto.deed)
        const user = await this.userModel.findById(dto.userId)
        user.deeds.push(deed)
        await user.save()
        return deed
    }

    async delete(id: ObjectId, userId: ObjectId): Promise<ObjectId> {
        const deed = await this.deedModel.findByIdAndDelete(id)
        const user = await this.userModel.findByIdAndUpdate(userId, {
            $pull: { deeds: id }
        })
        return deed.id
    }

    async update(dto: UpdateDeedDto): Promise<Deed> {

        const deed = await this.deedModel.findById(dto.deed.id)
        deed.text = dto.deed.text
        await deed.save()
        return deed
    }
}
