import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeIngredient{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string; 
  
  @Column()
  quantity: number

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient: Ingredient;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe: Recipe;
  
}