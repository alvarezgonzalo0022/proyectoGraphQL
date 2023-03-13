import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsPositive, IsString } from "class-validator";

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

}