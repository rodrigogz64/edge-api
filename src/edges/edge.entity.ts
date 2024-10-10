import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Edge {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  @Column()
  capacity: number;

  @Field()
  @Column()
  node1_alias: string;

  @Field()
  @Column()
  node2_alias: string;

  @Field()
  get edge_peers(): string {
    return `${this.node1_alias}-${this.node2_alias}`;
  }
}