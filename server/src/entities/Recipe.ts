import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne } from "@mikro-orm/core";
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity()
export class Recipe{

  @PrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property()
  length!: number;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  name!: string;

  @Property()
  saves!: number;

  @ManyToOne()
  author!: User;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  recipeIngredients: Collection<RecipeIngredient> = new Collection<RecipeIngredient>(this);
}