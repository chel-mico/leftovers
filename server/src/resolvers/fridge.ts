import { Fridge } from "../entities/Fridge";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, Query } from "type-graphql";
import { Context } from "../types";
import { Ingredient } from "../entities/Ingredient";
import { FridgeIngredient } from "../entities/FridgeIngredient";

@ObjectType()
class FridgeIngredientResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => FridgeIngredient, {nullable: true})
    fridgeIngredient?: FridgeIngredient
}

@Resolver()
export class FridgeResolver {
    @Query(() => Fridge)
    fridge(
        @Arg("id", () => String) id: string
    ): Promise<Fridge | undefined> {
        return Fridge.findOne(id);
    }

    @Query(() => Fridge, { nullable: true })
    userFridge(
        @Ctx() { req }: Context
    ): Promise<Fridge | undefined> | null {
        if (!req.session.fridgeId) {
            return null;
        }
        return Fridge.findOne(req.session.fridgeId)
    }

    @Mutation(() => FridgeIngredientResponse)
    async addFridgeIngredient (
        @Arg("name", () => String) name: string,
        @Ctx() { req }: Context
    ): Promise<FridgeIngredientResponse> {
        if (!req.session.fridgeId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const fridge = await Fridge.findOne(req.session.fridgeId)
        if (!fridge) {
            return {
                errors: ["Something went wrong with getting the fridge!"]
            };
        }

        let ingredient = await Ingredient.findOne({
            where: [{name}],
            relations: ["fridgeIngredients"]
        })
        if (!ingredient) {
            return {
                errors: ["That ingredient doesn't exist in our database!"]
            };
        }

        const newIngredient = FridgeIngredient.create({
            ingredientId: ingredient.id,
            fridgeId: fridge.id,
            ingredient,
            fridge,
            name
        });
        ingredient.fridgeIngredients.push(newIngredient);
        await ingredient.save();
        fridge.fridgeIngredients.push(newIngredient);
        await fridge.save();

        return {
            fridgeIngredient: newIngredient
        }
    }
}