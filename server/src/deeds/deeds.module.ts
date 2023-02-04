import { Module } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../users/schemas/users.schema";
import {Deed, DeedSchema} from "./schemas/deeds.schema";
import {UsersService} from "../users/users.service";

@Module({
  providers: [DeedsService],
  controllers: [DeedsController],
  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Deed.name, schema: DeedSchema }])
  ],
  exports: [DeedsService]
})
export class DeedsModule {}
