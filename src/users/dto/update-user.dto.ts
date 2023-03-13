import { CreateUserDTO } from './create-user.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @Field(() => Int)
  id: number;
}
