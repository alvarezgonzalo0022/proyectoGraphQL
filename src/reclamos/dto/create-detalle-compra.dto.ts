import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";

@InputType()
export class DetalleCompraDTO {

    @IsNumber()
    @Field((type) => Int)
    nroFactura: number;
    
    @IsString()
    @Field()
    codProd: string;
}