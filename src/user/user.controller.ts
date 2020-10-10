import { DeleteResult, UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @Get('query')
  // async getUserByQuery(@Query('id') id: number): Promise<User[]> {
  //   return this.userService.find(id);
  // }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.find(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: any): Promise<UpdateResult> {
    return this.userService.update({ id, ...body });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
