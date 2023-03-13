import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  
  @Query(() => [User])
  @UseGuards(JWTAuthGuard)
  users(@Args('limit', { type: () => Int, nullable: true }) limit: number, @Args('offset', { type: () => Int, nullable: true }) offset: number): Promise<User[]> {
    return this.usersService.findAll(limit, offset);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  createUser(@Args('createUserDTO') createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.create(createUserDTO);
  }

  @Query(() => User)
  @UseGuards(JWTAuthGuard)
  user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOneByID(id);
  }

  @Query(() => User)
  @UseGuards(JWTAuthGuard)
  userByUsername(@Args('username') username: string): Promise<User> {
    return this.usersService.findOneByID(username);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  updateUser(@Args('updateUserDTO') updateUserInput: UpdateUserDTO, @Args('id') id: string): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  removeUser(@Args('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
