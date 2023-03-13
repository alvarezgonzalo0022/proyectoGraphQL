import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Mutation((returns) => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') userInfo: LoginInput) {
        return this.authService.login(userInfo);
    }

    @Mutation((returns) => User)
    register(@Args('CreateUserInput') userInfo: CreateUserDTO) {
        return this.authService.register(userInfo);
    }

}
