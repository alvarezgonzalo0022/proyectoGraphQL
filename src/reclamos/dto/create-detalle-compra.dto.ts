import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class DetalleCompraDTO {

    @IsNumber()
    @Field((type) => Int)
    nroFactura: number;
    
    @IsString()
    @Field()
    codProd: string;
}