
import { Ingredient } from "../entities/Ingredient";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class IngredientInput {
    @Field()
    name: string
}

@Resolver()
export class IngredientResolver {
    @Query(() => [Ingredient])
    ingredients(): Promise<Ingredient[]> {
        return Ingredient.find()
    }

    @Query(() => Ingredient, {nullable: true})
    ingredient (
        @Arg("id", () => Int) id: number
    ): Promise<Ingredient | undefined> {
        return Ingredient.findOne(id);
    }

    @Mutation(() => Ingredient)
    async addIngredient(
        @Arg("input") input: IngredientInput
    ): Promise<Ingredient> {
        return Ingredient.create({
            ...input
        }).save();
    }
}