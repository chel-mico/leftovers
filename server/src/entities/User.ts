import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Fridge } from "./Fridge";
import { Recipe } from "./Recipe";

@Entity()
export class User {

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

  @OneToOne()
  fridge!: Fridge;

  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes = new Collection<Recipe>(this)

  @ManyToMany(() => Recipe)
  savedRecipes = new Collection<Recipe>(this)
}