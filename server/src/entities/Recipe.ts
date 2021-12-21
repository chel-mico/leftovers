import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeStep } from "./RecipeStep";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Column, ManyToMany, BaseEntity } from "typeorm";
import { Field, Int } from "type-graphql";

@Entity()
export class Recipe extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'text' })
  title!: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  saves: number;

  @Field()
  @Column()
  authorID: number;

  @ManyToOne(() => User, author => author.authoredRecipes)
  author: User;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => RecipeStep, steps => steps.recipe)
  steps: RecipeStep[];

  @ManyToMany(() => User, userSaves => userSaves.savedRecipes)
  userSaves: User[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}