import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserDTO {
  
  @IsString()
  @IsEmail()
  @Field()
  username: string;

  @IsString()
  @Field()
  password: string;

}
