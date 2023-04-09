import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  
  @Query(() => [User])
  @UseGuards(JWTAuthGuard)
  users(@Args('paginationDTO') paginationDTO: PaginationDTO, @CurrentUser([ValidRoles.admin]) user: User): Promise<User[]> {
    return this.usersService.findAll(paginationDTO);
  }

  @Query(() => User)
  @UseGuards(JWTAuthGuard)
  user(@Args('id') id: string, @CurrentUser([ValidRoles.admin]) user: User): Promise<User> {    
    return this.usersService.findOneByID(id);
  }

  @Query(() => User)
  @UseGuards(JWTAuthGuard)
  userByUsername(@Args('username') username: string, @CurrentUser([ValidRoles.admin]) user: User): Promise<User> {
    return this.usersService.findOneByID(username);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  updateUser(@Args('updateUserDTO') updateUserInput: UpdateUserDTO, @Args('id') id: string, @CurrentUser([ValidRoles.admin]) user: User): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  removeUser(@Args('id') id: string, @CurrentUser([ValidRoles.admin]) user: User): Promise<void> {
    return this.usersService.remove(id);
  }
}
