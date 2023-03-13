
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

@InputType()
export class LoginInput {
    
    @Field()
    @IsString()
    username: string;

    @Field()
    @IsString()
    password: string;

}