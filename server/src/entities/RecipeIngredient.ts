import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeIngredient{
    
  @ManyToOne(() => Ingredient)
  ingredient!: Ingredient;

  @ManyToOne(() => Recipe, {
    onDelete: "CASCADE",
  })
  recipe!: Recipe;

  @Property()
  quantity!: number
}