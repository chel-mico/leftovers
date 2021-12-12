import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Ingredient } from "./Ingredient";
import { Fridge } from "./Fridge";

@Entity()
export class FridgeIngredient{
    
  @ManyToOne(() => Ingredient)
  ingredient!: Ingredient;

  @ManyToOne(() => Fridge, {
    onDelete: "CASCADE",
  })
  fridge!: Fridge;

  @Property()
  quantity!: number
}