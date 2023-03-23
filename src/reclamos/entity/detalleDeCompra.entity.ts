import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reclamo } from "./reclamo.entity";

@Entity("detalleDeCompra")
@ObjectType()
export class DetalleCompra {

    @PrimaryGeneratedColumn('increment')
    @Field((type) => Int)
    id: number;

    @Column('date')
    @Field(() => Date)
    fechaCompra: Date;

    @Column('int')
    @Field(() => Int)
    nroFactura: number;

    @Column('varchar')
    @Field()
    codProd: string;
    
}