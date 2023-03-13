
import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

@InputType()
export class UpdateReclamoDTO {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Field((type) => Int, { nullable: true })
    nro?: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    descripcion?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    detalleDeCompra?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    problema?: string;

}