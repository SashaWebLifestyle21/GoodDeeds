import {ObjectId} from "mongoose";

export class UpdateDeedDto {
    readonly deed: {
        id: ObjectId
        text: string
    }
    readonly userId: string
}