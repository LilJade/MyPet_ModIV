import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Users} from '../models';
import {UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class UserServiceService {
  constructor(
    @repository(UsersRepository) private usersRepository: UsersRepository,
  ) { }

  async create(user: Users): Promise<Users> {
    return this.usersRepository.create(user);
  }

  // Corregir el tipo del parámetro de 'number' a 'string'
  async findById(id: string): Promise<Users | null> {
    return this.usersRepository.findById(id);
  }

  async update(user: Users): Promise<void> {
    await this.usersRepository.update(user);
  }
}
