import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DetalleCompra } from "./detalleDeCompra.entity";
import { User } from "../../users/entities/user.entity";

@Entity("reclamos")
@ObjectType()
export class Reclamo {

    @PrimaryGeneratedColumn('increment')
    @Field((type) => Int)
    nro: number;

    @Column('varchar')
    @Field()
    titulo: string;

    @Column('varchar')
    @Field()
    descripcion: string;

    @Column('varchar')
    @Field()
    problema: string;
    
    @Column('varchar', { nullable: true })
    @Field({ nullable: true })
    imgURL?: string;

    @OneToOne(() => DetalleCompra, { cascade: true })
    @JoinColumn({ name: 'detalleDeCompraID' })
    @Field((type) => DetalleCompra)
    detalleDeCompra: DetalleCompra;

    @ManyToOne(() => User, (user) => user.reclamos, { cascade: true })
    @Field((type) => User)
    @JoinColumn({ name: 'userID' })
    user: User;
}