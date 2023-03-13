import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reclamos")
@ObjectType()
export class Reclamo {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column('int')
    @Field((type) => Int)
    nro: number;

    @Column('varchar')
    @Field()
    descripcion: string;

    @Column('varchar')
    @Field()
    detalleDeCompra: string;

    @Column('varchar')
    @Field()
    problema: string;
}