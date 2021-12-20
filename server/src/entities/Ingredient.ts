import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity()
export class Ingredient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => RecipeIngredient, recipeIngredients => recipeIngredients.ingredient)
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.ingredient)
  fridgeIngredients: FridgeIngredient[];
  
}