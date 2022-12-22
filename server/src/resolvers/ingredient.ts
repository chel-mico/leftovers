import { Ingredient } from "../entities/Ingredient";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@InputType()
class IngredientInput {
    @Field()
    name: string
}

@ObjectType()
class IngredientResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => Ingredient, {nullable: true})
    ingredient?: Ingredient
}

@Resolver()
export class IngredientResolver {
    @Query(() => [Ingredient])
    ingredients(): Promise<Ingredient[]> {
        return Ingredient.find()
    }

    @Query(() => Ingredient, {nullable: true})
    ingredientByName (
        @Arg("name", () => String) name: string
    ): Promise<Ingredient | null> {
        return Ingredient.findOne({where: [
            {name}
        ]});
    }

    @Mutation(() => IngredientResponse)
    async addIngredient(
        @Arg("input") input: IngredientInput
    ): Promise<IngredientResponse> {
        const ingredient = await Ingredient.findOne({where: [
            {name: input.name}
        ]});

        if (ingredient) {
            return {
                errors: ["Ingredient already exists"]
            }
        }

        const newIngredient = await Ingredient.create({
            ...input,
            fridgeIngredients: [],
            recipeIngredients: []
        }).save();

        return {
            ingredient: newIngredient
        }
    }
}