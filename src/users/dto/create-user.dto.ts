import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserDTO {
  
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;

}
