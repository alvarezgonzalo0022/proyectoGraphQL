import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateDetalleCompraDTO {

    @IsOptional()
    @IsNumber()
    @Field((type) => Int, { nullable: true })
    nroFactura?: number;
    
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    codProd?: string;
}