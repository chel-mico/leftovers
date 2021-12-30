import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FridgeIngredient } from "./FridgeIngredient";
import { User } from "./User";

@ObjectType()
@Entity()
export class Fridge extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Field(() => [FridgeIngredient], { nullable: true })
  @OneToMany(() => FridgeIngredient, fridgeIngredients => fridgeIngredients.fridge, {
    cascade: true
  })
  fridgeIngredients: FridgeIngredient[];
  
  @OneToOne(() => User, owner => owner.fridge, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  owner: User;
  
}
