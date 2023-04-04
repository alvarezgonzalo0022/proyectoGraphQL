import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

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
      role: "USER"
    }

    this.userRepository.create(userToSave);

    return await this.userRepository.save(userToSave);

  }

  async findAll(paginationDTO: PaginationDTO): Promise<User[]> {

    const { limit = 10, offset = 0 } = paginationDTO;

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

    const user = await this.findOneByID(id);
    
    if(!user) throw new BadRequestException('No existe el usuario');
    
    if (updateUserDTO.password) updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 10);

    const userToSave = this.userRepository.create({
      ...user,
      ...updateUserDTO,
    })

    return await this.userRepository.save(userToSave);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
