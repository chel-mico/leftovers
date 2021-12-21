import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, BaseEntity } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeStep extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  desc!: string;
  
  @Column({ type: 'int' })
  stepNum!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Recipe, recipe => recipe.steps)
  recipe: Recipe;
  
}