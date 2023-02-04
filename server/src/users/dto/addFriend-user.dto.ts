import {ObjectId} from "mongoose";

export class AddFriendUserDto {
    readonly nickname: string
    readonly id: ObjectId
}