import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
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

  @Property({ type: 'text' })
  name!: string;

  @OneToMany(() => FridgeIngredient, ingredient => ingredient.fridge)
  fridgeIngredients: Collection<FridgeIngredient> = new Collection<FridgeIngredient>(this);

  @OneToOne(() => User, user => user.fridge, {
    onDelete: "CASCADE",
  })
  owner!: User;
}