import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column('varchar')
  @Field()
  username: string;


  @Column('varchar')
  @Field()
  password: string;

}
