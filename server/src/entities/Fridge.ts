import { Entity, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { FridgeIngredient } from "./FridgeIngredient";
import { User } from "./User";

@Entity()
export class Fridge {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => FridgeIngredient, ingredient => ingredient.fridge)
  fridgeIngredients: FridgeIngredient[];

  @OneToOne(() => User, user => user.fridge, {
    onDelete: "CASCADE",
  })
  owner: User;
}