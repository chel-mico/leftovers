import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { RecipeIngredient } from "./RecipeIngredient";

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Field()
  @Column({ type: 'text', unique: true })
  name!: string;

  @Field(() => [RecipeIngredient], { nullable: true })
  @OneToMany(() => RecipeIngredient, recipeIngredients => recipeIngredients.ingredient, {
    cascade: true
  })
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.ingredient, {
    cascade: true
  })
  fridgeIngredients: FridgeIngredient[];
  
}