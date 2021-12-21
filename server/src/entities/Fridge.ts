import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { User } from "./User";

@ObjectType()
@Entity()
export class Fridge extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.fridge)
  fridgeIngredients: FridgeIngredient[];

  @Field()
  @Column()
  ownerID: number;
  
  @OneToOne(() => User, owner => owner.fridge)
  owner!: User;
  
}
