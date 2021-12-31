import { Ingredient } from "./Ingredient";
import { Fridge } from "./Fridge";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class FridgeIngredient extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name: string;
  
  @Field()
  @Column()
  ingredientId: string;
  
  @Field(() => Ingredient, { nullable: true })
  @ManyToOne(() => Ingredient, ingredient => ingredient.fridgeIngredients, {
    onUpdate: "CASCADE"
  })
  ingredient: Ingredient;

  @Field()
  @Column()
  fridgeId: string;
  
  @ManyToOne(() => Fridge, fridge => fridge.fridgeIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  fridge: Fridge;
  
}