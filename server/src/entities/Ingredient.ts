import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { FridgeIngredient } from "./FridgeIngredient";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity()
export class Ingredient {

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  createdAt = new Date();

  @Property()
  type!: string;

  @Property()
  measurement!: string; //cup, tbsp, tsp, g, kg, L, mL

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.ingredient)
  recipeIngredients: Collection<RecipeIngredient> = new Collection<RecipeIngredient>(this);

  @OneToMany(() => FridgeIngredient, ingredient => ingredient.ingredient)
  fridgeIngredients: Collection<FridgeIngredient> = new Collection<FridgeIngredient>(this);
}