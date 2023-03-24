import { ObjectType, Field } from '@nestjs/graphql';
import { Reclamo } from 'src/reclamos/entity/reclamo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column('varchar', {
    unique: true,
  })
  @Field()
  username: string;

  @Column('varchar')
  @Field()
  password: string;

  @OneToMany(() => Reclamo, (reclamo) => reclamo.user)
  @Field((type) => [Reclamo])
  reclamos: Reclamo[];

}
