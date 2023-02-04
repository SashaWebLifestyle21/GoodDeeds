import {ObjectId} from "mongoose";

export class UpdateUserDto {
    readonly _id: string
    readonly email: string
    readonly name: string
    readonly nickname: string
    readonly password: string
}