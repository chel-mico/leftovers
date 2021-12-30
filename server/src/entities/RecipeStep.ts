import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class RecipeStep extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Field()
  @Column({ type: 'text' })
  desc!: string;
  
  @Field(() => Int)
  @Column({ type: 'int' })
  stepNum!: number;

  @Field()
  @Column()
  recipeId: string;

  @ManyToOne(() => Recipe, recipe => recipe.steps, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  recipe: Recipe;
  
}