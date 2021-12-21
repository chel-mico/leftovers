import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeStep } from "./RecipeStep";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Column, ManyToMany, BaseEntity } from "typeorm";
import { Field, Int } from "type-graphql";

@Entity()
export class Recipe extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: 'text' })
  title!: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  saves: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @ManyToOne(() => User, author => author.authoredRecipes)
  author: User;

  @Field()
  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  recipeIngredients: RecipeIngredient[];

  @Field()
  @OneToMany(() => RecipeStep, steps => steps.recipe)
  steps: RecipeStep[];

  @Field()
  @ManyToMany(() => User, userSaves => userSaves.savedRecipes)
  userSaves: User[];
  
}