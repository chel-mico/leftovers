import { Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
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

  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text', unique: true })
  email!: string;

  @Property({ type: 'text' })
  password!: string;

  @OneToOne(() => Fridge)
  fridge?: Fridge | null;

  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes?: Recipe[];

  @ManyToMany(() => Recipe)
  savedRecipes?: Recipe[];
}