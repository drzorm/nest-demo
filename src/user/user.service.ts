import { DeleteResult, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    return await User.find();
  }

  async find(id: number): Promise<any> {
    const result = await User.findOne({ id });
    return result;
  }

  async create(user: CreateUserDto): Promise<User> {
    return await User.create(user);
  }

  async update(user: User): Promise<UpdateResult> {
    return await User.update(user.id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await User.delete(id);
  }
}
