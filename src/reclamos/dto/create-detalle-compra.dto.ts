import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class DetalleCompraDTO {

    @IsNumber()
    @Field(() => Int)
    nroFactura: number;
    
    @IsString()
    @Field()
    codProd: string;
}