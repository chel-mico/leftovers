import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { FridgeIngredient } from "./FridgeIngredient";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity()
export class Ingredient {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  name!: string;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.ingredient)
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => FridgeIngredient, ingredient => ingredient.ingredient)
  fridgeIngredients: FridgeIngredient[];
}