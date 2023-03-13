import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login-input.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneByUsername(username);

        if(!user) throw new BadRequestException('Usuario no encontrado en la base de datos');

        if(user.username !== username || !bcrypt.compareSync(password, user.password)) {
            throw new BadRequestException('Usuario o contraseña incorrectos');
        }

        const { password: pass, ...result } = user;

        return {
            ...result,
        };
    }


    async login(userInfo: LoginInput) {

        const user = await this.userService.findOneByUsername(userInfo.username);

        const { password: pass, ...result } = user;


        return {
            accessToken: this.jwtService.sign({ username: userInfo.username, sub: user.id }),
            user: result,
        }
    }

    async register(userInfo: CreateUserDTO) {
        
        const user = await this.userService.findOneByUsername(userInfo.username);
    

        if(user) throw new BadRequestException('El usuario ya existe en la base de datos');


        return await this.userService.create(userInfo);

    }

}
