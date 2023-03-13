import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async create(createUserDTO: CreateUserDTO): Promise<User> {
    
    const userToSave = {
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    }

    this.userRepository.create(userToSave);

    return await this.userRepository.save(userToSave);

  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    return await this.userRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOneByID(id: string): Promise<User> {
    return await this.userRepository.findOneBy({id});
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({username});
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    return ;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
