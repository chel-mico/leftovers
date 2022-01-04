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

  @Field(() => [String])
  @Column("text", {array: true, default: []})
  savedRecipes: string[];

  @Field()
  @Column()
  fridgeId: string;

  @Field(() => Fridge) //make nullable?
  @OneToOne(() => Fridge, fridge => fridge.owner, {
    cascade: true
  })
  @JoinColumn()
  fridge: Fridge;

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, recipe => recipe.author, {
    cascade: true
  })
  authoredRecipes: Recipe[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}