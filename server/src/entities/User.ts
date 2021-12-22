import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Fridge } from "./Fridge";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: 'text', unique: true })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @OneToOne(() => Fridge, fridge => fridge.owner)
  @JoinColumn()
  fridge: Fridge;

  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes: Recipe[];

  @Field(() => [String])
  @Column("text", {array: true, default: []})
  savedRecipes: string[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}