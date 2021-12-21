import { Ingredient } from "./Ingredient";
import { Fridge } from "./Fridge";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FridgeIngredient extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  measurement: string; //cup, tbsp, tsp, g, kg, L, mL

  @Column({ type: 'float' })
  quantity: number;
  
  @ManyToOne(() => Ingredient, ingredient => ingredient.fridgeIngredients)
  ingredient!: Ingredient;

  @ManyToOne(() => Fridge, fridge => fridge.fridgeIngredients)
  fridge!: Fridge;
  
}