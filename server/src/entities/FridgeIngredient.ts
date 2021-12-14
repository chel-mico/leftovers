import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Ingredient } from "./Ingredient";
import { Fridge } from "./Fridge";

@Entity()
export class FridgeIngredient{
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'text' })
  measurement!: string; //cup, tbsp, tsp, g, kg, L, mL

  @Property({ type: 'float' })
  quantity!: number;
  
  @ManyToOne(() => Ingredient)
  ingredient!: Ingredient;

  @ManyToOne(() => Fridge, {
    onDelete: "CASCADE",
  })
  fridge!: Fridge;
}