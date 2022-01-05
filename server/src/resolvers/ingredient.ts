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

    @Query(() => Ingredient)
    ingredientByName (
        @Arg("name", () => String) name: string
    ): Promise<Ingredient | undefined> | null {
        const ingredient = Ingredient.findOne({where: [
            {name}
        ]});
        if (!ingredient) {
            return null
        }
        return ingredient
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

        const newIngredient = Ingredient.create({
            ...input,
            fridgeIngredients: [],
            recipeIngredients: []
        });
        newIngredient.save()
        return {
            ingredient: newIngredient
        }
    }
}