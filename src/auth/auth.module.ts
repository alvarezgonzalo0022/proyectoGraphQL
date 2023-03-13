import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, AuthResolver, LocalStrategy, JWTStrategy],
  imports: [UsersModule, PassportModule, JwtModule.register({
    signOptions: { expiresIn: '2h' },
    secret: "TopSecretArea",
  })]
})
export class AuthModule {}
