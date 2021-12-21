import { Ingredient } from "./Ingredient";
import { Fridge } from "./Fridge";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class FridgeIngredient extends BaseEntity {
  
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: 'text' })
  measurement: string; //cup, tbsp, tsp, g, kg, L, mL

  @Field(() => Float)
  @Column({ type: 'float' })
  quantity: number;
  
  @Field()
  @ManyToOne(() => Ingredient, ingredient => ingredient.fridgeIngredients)
  ingredient!: Ingredient;

  @Field()
  @ManyToOne(() => Fridge, fridge => fridge.fridgeIngredients)
  fridge!: Fridge;
  
}