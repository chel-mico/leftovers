import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Fridge } from "./Fridge";
import { Recipe } from "./Recipe";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Fridge, fridge => fridge.owner)
  @JoinColumn()
  fridge: Fridge;

  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes: Recipe[];

  @ManyToMany(() => Recipe, recipe => recipe.saves)
  savedRecipes: Recipe[]; 
  
}