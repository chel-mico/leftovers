import { Fridge } from "../entities/Fridge";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, Query } from "type-graphql";
import { Context } from "../types";
import { User } from "../entities/User";
import { Ingredient } from "../entities/Ingredient";
import { FridgeIngredient } from "../entities/FridgeIngredient";

@ObjectType()
class FridgeResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => Fridge, {nullable: true})
    fridge?: Fridge
}

@ObjectType()
class FridgeIngredientResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => Ingredient, {nullable: true})
    ingredient?: Ingredient
}

@Resolver()
export class FridgeResolver {
    @Query(() => Fridge)
    fridge(
        @Arg("id", () => String) id: string
    ): Promise<Fridge | undefined> {
        return Fridge.findOne(id);
    }

    @Mutation(() => FridgeResponse)
    async makeFridge(
        @Ctx() { req }: Context
    ): Promise<FridgeResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const owner = await User.findOne(req.session.userId)
        if (!owner) {
            return {
                errors: ["Something went wrong with getting the user!"]
            };
        }

        if (owner.fridgeId) {
            return {
                errors: ["User already has a fridge!"]
            }
        }

        const newFridge = Fridge.create({
            fridgeIngredients: [],
            owner: owner
        });
        owner.fridge = newFridge;
        owner.fridgeId = newFridge.id;
        await owner.save();

        return {
            fridge: newFridge
        }
    }

    @Mutation(() => FridgeIngredientResponse)
    async addFridgeIngredient (
        @Arg("name", () => String) name: string,
        @Ctx() { req }: Context
    ): Promise<FridgeIngredientResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const fridge = await Fridge.findOne({where: [
            {ownerID: req.session.userId}
        ]})
        if (!fridge) {
            return {
                errors: ["User doesn't have a fridge!"]
            };
        }


        let ingredient = await Ingredient.findOne({where: [
            {name}
        ]})
        if (!ingredient) {
            ingredient = await Ingredient.create({
                name,
                fridgeIngredients: [],
                recipeIngredients: []
            }).save()
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
        await ingredient.save();

        return {
            ingredient: ingredient
        }
    }
}