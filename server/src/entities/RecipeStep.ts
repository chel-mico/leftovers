import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeStep{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  desc: string;
  
  @Column()
  stepNum: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Recipe, recipe => recipe.steps)
  recipe: Recipe;
  
}