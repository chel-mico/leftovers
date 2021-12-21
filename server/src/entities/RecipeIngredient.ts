import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeIngredient extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  name!: string; 
  
  @Column({ type: 'text' })
  measurement!: string; //cup, tbsp, tsp, g, kg, L, mL

  @Column({ type: 'float' })
  quantity!: number

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient: Ingredient;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe: Recipe;
  
}