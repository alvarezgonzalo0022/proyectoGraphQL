import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";

@InputType()
export class CreateReclamoDTO {

    @IsNumber()
    @IsPositive()
    @Field((type) => Int)
    nro: number;

    @IsString()
    @Field()
    descripcion: string;

    @IsString()
    @Field()
    detalleDeCompra: string;

    @IsString()
    @Field()
    problema: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    idUser?: string;

    @IsOptional()
    @Field((type) => CreateUserDTO, { nullable: true })
    user?: CreateUserDTO;

}