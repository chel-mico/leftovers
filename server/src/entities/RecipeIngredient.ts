import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class RecipeIngredient extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Field()
  @Column({ type: 'text' })
  name!: string; 

  @Field()
  @Column({ type: 'text' })
  quantity!: string;

  @Field()
  @Column()
  ingredientId: string;
  
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients, {
    onUpdate: "CASCADE"
  })
  ingredient: Ingredient;

  @Field()
  @Column()
  recipeId: string;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  recipe: Recipe;
  
}