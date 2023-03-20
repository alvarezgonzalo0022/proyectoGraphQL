import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("reclamos")
@ObjectType()
export class Reclamo {

    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    // el unique es true pa
    @Column('int', { unique: false })
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

    @ManyToOne(() => User, (user) => user.reclamos)
    @Field((type) => User)
    user: User;
}