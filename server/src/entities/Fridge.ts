import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { User } from "./User";

@Entity()
export class Fridge extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.fridge)
  fridgeIngredients: FridgeIngredient[];

  @OneToOne(() => User, owner => owner.fridge)
  owner!: User;
  
}
