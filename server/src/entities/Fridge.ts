import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { User } from "./User";

@ObjectType()
@Entity()
export class Fridge extends BaseEntity {
  
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.fridge)
  fridgeIngredients: FridgeIngredient[];

  @Field()
  @OneToOne(() => User, owner => owner.fridge)
  owner!: User;
  
}
