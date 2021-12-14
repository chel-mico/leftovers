import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Fridge } from "./Fridge";
import { Recipe } from "./Recipe";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  name!: string;

  @OneToOne("Fridge")
  fridge!: Fridge;

  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes = new Collection<Recipe>(this)

  @ManyToMany(() => Recipe)
  savedRecipes = new Collection<Recipe>(this)
}