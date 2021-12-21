import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class RecipeStep extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: 'text' })
  desc!: string;
  
  @Field(() => Int)
  @Column({ type: 'int' })
  stepNum!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @ManyToOne(() => Recipe, recipe => recipe.steps)
  recipe: Recipe;
  
}