import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class LoginResponse {

    @Field()
    @IsString()
    accessToken: string;

    @Field(() => User)
    user: User;

}