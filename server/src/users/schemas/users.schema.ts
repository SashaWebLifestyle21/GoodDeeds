import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {Deed} from "../../deeds/schemas/deeds.schema";
import * as mongoose from "mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop()
    name: string;

    @Prop()
    nickname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Deed'}]})
    deeds: Deed[];

    @Prop()
    friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);