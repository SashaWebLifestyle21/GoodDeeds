import {Body, Controller, Delete, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {DeedsService} from "./deeds.service";
import {CreateDeedDto} from "./dto/create-deed.dto";
import {ObjectId} from "mongoose";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {UpdateDeedDto} from "./dto/update-deed.dto";

@Controller('deeds')
export class DeedsController {
    constructor(private deedService: DeedsService) {
    }

    @Post()
    create(@Body() deedDto: CreateDeedDto) {
        return this.deedService.createDeed(deedDto)
    }

    @Delete(':id/:userId')
    delete(@Param('id') id: ObjectId, @Param('userId') userId: ObjectId) {
        return this.deedService.delete(id, userId)
    }

    @Put()
    update(@Body() deedDto: UpdateDeedDto) {
        return this.deedService.update(deedDto)
    }
}
