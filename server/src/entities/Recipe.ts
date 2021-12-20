import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeStep } from "./RecipeStep";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Column, ManyToMany } from "typeorm";

@Entity()
export class Recipe{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column()
  saves: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, author => author.authoredRecipes)
  author: User;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => RecipeStep, steps => steps.recipe)
  steps: RecipeStep[];

  @ManyToMany(() => User, userSaves => userSaves.savedRecipes)
  userSaves: User[];
  
}