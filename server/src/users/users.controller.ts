import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ObjectId} from "mongoose";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AddFriendUserDto} from "./dto/addFriend-user.dto";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.userService.delete(id)
    }

    @Put()
    update(@Body() userDto: UpdateUserDto) {
        return this.userService.update(userDto)
    }

    @Post('addFriend')
    addFriend(@Body() userDto: AddFriendUserDto) {
        return this.userService.addFriend(userDto)
    }

    @Get(':id')
    getFriends(@Param('id') id: ObjectId) {
        return this.userService.getAllFriends(id)
    }

}
