import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { RecipeIngredient } from "./RecipeIngredient";

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: 'text' })
  name!: string;

  @Field()
  @OneToMany(() => RecipeIngredient, recipeIngredients => recipeIngredients.ingredient)
  recipeIngredients: RecipeIngredient[];

  @Field()
  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.ingredient)
  fridgeIngredients: FridgeIngredient[];
  
}