import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/schemas/users.schema";
import {LoginUserDto} from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {


    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async registration(userDto: CreateUserDto) {
        const candidateEmail = await this.userService.getUserByEmail(userDto.email)

        if(candidateEmail) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const candidateNickname = await this.userService.getUserByNickname(userDto.nickname)

        if(candidateNickname) {
            throw new HttpException('Пользователь с таким nickname уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)

        const user = await this.userService.createUser({...userDto, password: hashPassword, nickname: '@'+userDto.nickname})

        const token = await this.generateToken(user)
        return {user, token}
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        const token = await this.generateToken(user)
        return {user, token}
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, name: user.name, nickname: user.nickname }
        const token = this.jwtService.sign(payload)
        return token
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        if(!user) {
            throw new UnauthorizedException({ message: 'Некорректный email' })
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(!passwordEquals) {
            throw new UnauthorizedException({ message: 'Некорректный пароль' })
        }
        if(user && passwordEquals) {
            return user
        }
    }


}
