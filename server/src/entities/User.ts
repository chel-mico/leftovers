import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Fridge } from "./Fridge";
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'text', unique: true })
  username!: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email!: string;

  @Field()
  @Column({ type: 'text' })
  password!: string;

  @OneToOne(() => Fridge, fridge => fridge.owner)
  @JoinColumn()
  fridge: Fridge;

  @OneToMany(() => Recipe, recipe => recipe.author)
  authoredRecipes: Recipe[];

  @ManyToMany(() => Recipe, recipe => recipe.saves)
  savedRecipes: Recipe[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}