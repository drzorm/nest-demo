import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async find(id: number): Promise<any> {
    const result = await this.userRepository.find({ id });
    return result[0];
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
