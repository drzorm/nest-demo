import { Controller, Get, Param } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

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
  }}
