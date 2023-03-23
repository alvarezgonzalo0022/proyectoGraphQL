import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DetalleCompra } from "./detalleDeCompra.entity";

@Entity("reclamos")
@ObjectType()
export class Reclamo {

    @PrimaryGeneratedColumn('increment')
    @Field((type) => Int)
    nro: number;

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
    @Field((type) => DetalleCompra)
    detalleDeCompra: DetalleCompra;

    @ManyToOne(() => User, (user) => user.reclamos, { cascade: true })
    @Field((type) => User)
    @JoinColumn({ name: 'user' })
    user: User;
}