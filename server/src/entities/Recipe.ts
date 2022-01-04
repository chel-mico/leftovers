import { User } from "./User";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeStep } from "./RecipeStep";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Field()
  @Column({ type: 'text' })
  title!: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  saves: number;

  @Field()
  @Column()
  authorId: string;
  
  @Field(() => User)
  @ManyToOne(() => User, author => author.authoredRecipes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  author: User;

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe, {
    cascade: true
  })
  recipeIngredients: RecipeIngredient[];

  @Field(() => [RecipeStep])
  @OneToMany(() => RecipeStep, steps => steps.recipe, {
    cascade: true
  })
  steps: RecipeStep[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}