import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import mongoose from "mongoose";
import {User} from "../../users/schemas/users.schema";


export type DeedDocument = HydratedDocument<Deed>;

@Schema()
export class Deed {
    @Prop()
    text: string;

    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    // userId: User;

}

export const DeedSchema = SchemaFactory.createForClass(Deed);