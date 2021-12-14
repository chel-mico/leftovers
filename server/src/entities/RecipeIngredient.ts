import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeIngredient{
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  name!: string; 

  @ManyToOne(() => Ingredient)
  ingredient!: Ingredient;

  @ManyToOne(() => Recipe, {
    onDelete: "CASCADE",
  })
  recipe!: Recipe;

  @Property()
  quantity!: number
}