import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeStep{

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  desc!: string;
  
  @Property()
  stepNum!: string;

  @ManyToOne("Recipe")
  recipe!: Recipe;
}