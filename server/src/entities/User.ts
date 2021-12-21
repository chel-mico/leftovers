import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Fridge } from "./Fridge";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  username!: string;

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  email!: string;

  @Field(() => String)
  @Column({ type: 'text' })
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @OneToOne(() => Fridge, fridge => fridge.owner)
  @JoinColumn()
  fridge: Fridge;

  @Field()
  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes: Recipe[];

  @Field()
  @ManyToMany(() => Recipe, recipe => recipe.saves)
  savedRecipes: Recipe[]; 
  
}