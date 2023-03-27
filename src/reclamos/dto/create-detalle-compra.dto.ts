import { Field, InputType, Int } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";

@InputType()
export class DetalleCompraDTO {

    @IsDate()
    @Field((type) => Date)
    fechaCompra: Date

    @IsNumber()
    @Field((type) => Int)
    nroFactura: number;
    
    @IsString()
    @Field()
    codProd: string;
}