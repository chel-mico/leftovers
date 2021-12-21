import { Field, Float, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class RecipeIngredient extends BaseEntity {
  
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: 'text' })
  name!: string; 
  
  @Field(() => String)
  @Column({ type: 'text' })
  measurement!: string; //cup, tbsp, tsp, g, kg, L, mL

  @Field(() => Float)
  @Column({ type: 'float' })
  quantity!: number

  @Field()
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient: Ingredient;

  @Field()
  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe: Recipe;
  
}