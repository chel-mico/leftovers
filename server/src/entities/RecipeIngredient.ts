import { Field, Float, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class RecipeIngredient extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'text' })
  name!: string; 
  
  @Field()
  @Column({ type: 'text' })
  measurement!: string; //cup, tbsp, tsp, g, kg, L, mL

  @Field(() => Float)
  @Column({ type: 'float' })
  quantity!: number

  @Field()
  @Column()
  ingredientID: number;
  
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient: Ingredient;

  @Field()
  @Column()
  recipeID: number;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe: Recipe;
  
}