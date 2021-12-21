import { Ingredient } from "./Ingredient";
import { Fridge } from "./Fridge";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class FridgeIngredient extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'text' })
  measurement: string; //cup, tbsp, tsp, g, kg, L, mL

  @Field(() => Float)
  @Column({ type: 'float' })
  quantity: number;
  
  @Field()
  @Column()
  ingredientID: number;
  
  @ManyToOne(() => Ingredient, ingredient => ingredient.fridgeIngredients)
  ingredient!: Ingredient;

  @Field()
  @Column()
  fridgeID: number;
  
  @ManyToOne(() => Fridge, fridge => fridge.fridgeIngredients)
  fridge!: Fridge;
  
}