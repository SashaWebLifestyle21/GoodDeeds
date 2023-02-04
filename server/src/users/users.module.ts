import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Deed, DeedSchema} from "../deeds/schemas/deeds.schema";
import {User, UserSchema} from "./schemas/users.schema";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports:[
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      MongooseModule.forFeature([{name: Deed.name, schema: DeedSchema }])
  ],
    exports: [UsersService]
})
export class UsersModule {}
