import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserDTO {
  
  @IsString()
  @Field()
  username: string;

  @IsString()
  @Field()
  password: string;

}
