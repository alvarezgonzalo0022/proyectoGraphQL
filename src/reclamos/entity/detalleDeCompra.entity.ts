import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("detalleDeCompra")
@ObjectType()
export class DetalleCompra {

    @PrimaryGeneratedColumn('increment')
    @Field((type) => Int)
    id: number;

    @Column('date')
    @Field((type) => Date)
    fechaCompra: Date;

    @Column('int')
    @Field((type) => Int)
    nroFactura: number;

    @Column('varchar')
    @Field()
    codProd: string;
    
}