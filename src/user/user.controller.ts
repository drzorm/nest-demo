import { DeleteResult, UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param() params: any): Promise<User> {
    return this.userService.find(params.id);
  }

  @Post()
  createUser(@Body() body: any): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() body: any): Promise<UpdateResult> {
    return this.userService.update({ id, ...body });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
