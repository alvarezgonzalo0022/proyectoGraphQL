import { IsOptional, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  password?: string;
}
