import { Entity, PrimaryKey, Property, OneToMany, ManyToOne } from "@mikro-orm/core";
import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeStep } from "./RecipeStep";

@Entity()
export class Recipe{

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  title!: string;

  @Property()
  saves!: number;

  @ManyToOne("User")
  author!: User;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => RecipeStep, step => step.recipe)
  step: RecipeStep[];
}