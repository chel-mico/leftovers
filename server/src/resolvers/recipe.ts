import { Fridge } from "../entities/Fridge";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, Query, Int, InputType } from "type-graphql";
import { Context } from "../types";
import { Recipe } from "../entities/Recipe";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { RecipeIngredient } from "../entities/RecipeIngredient";
import { RecipeStep } from "../entities/RecipeStep";
import { Ingredient } from "../entities/Ingredient";

@ObjectType()
class RecipeResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => Recipe, {nullable: true})
    recipe?: Recipe
    @Field(() => Int, {nullable: true})
    offBy?: number
}

@ObjectType()
class RecipeIngredientResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => RecipeIngredient, {nullable: true})
    recipeIngredient?: RecipeIngredient
}

@ObjectType()
class RecipeStepResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => RecipeStep, {nullable: true})
    recipeStep?: RecipeStep
}

@ObjectType()
class RecipeRemoveResponse {
    @Field(() => [String], {nullable: true})
    errors?: string[]
    @Field(() => Boolean, {nullable: true})
    removed?: boolean
}

@InputType()
class RecipeIngredientInput {
    @Field(() => String)
    name: string = "";
    @Field()
    quantity: string;
    @Field()
    recipeId: string;
}

@InputType()
class RecipeStepInput {
    @Field(() => String)
    desc: string = "";
    @Field()
    recipeId: string;
    @Field(() => Int)
    stepNum: number
}

@Resolver()
export class RecipeResolver {
    @Query(() => Recipe, { nullable: true })
    recipe(
        @Arg("id") id: string
    ): Promise<Recipe | null> | null {
        const recipe = Recipe.findOne({
            where: {
                id: id
            },
            relations: {
                recipeIngredients: true,
                steps: true
            }
        })
        if (!recipe) {
            return null
        }
        return recipe
    }

    @Query(() => [Recipe])
    allRecipes(): Promise<Recipe[]> {
        return Recipe.find()
    }

    @Query(() => [RecipeResponse])
    async recipeMatch(
        @Ctx() { req }: Context 
    ): Promise<RecipeResponse[]> {
        if (!req.session.fridgeId) {
            return [{
                errors: ["User is not logged in!"]
            }];
        }

        const fridge = await Fridge.findOne({
            where: {
                id: req.session.fridgeId
            }
        })
        if (!fridge) {
            return [{
                errors: ["Something went wrong with getting the fridge!"]
            }];
        }

        let recipes: Recipe | Recipe[] | undefined = await getConnection().query(`
            SELECT *
            FROM recipe
            WHERE EXISTS (
                SELECT "name", "recipeId"
                FROM recipe_ingredient
                WHERE recipe.id = "recipeId"
                AND recipe_ingredient.name IN (
                    SELECT "name"
                    FROM fridge_ingredient
                    WHERE fridge_ingredient."fridgeId" = $1
                    AND fridge_ingredient.name = recipe_ingredient.name
                )
        )
        `, [req.session.fridgeId])
        if (!recipes) {
            return [{
                errors: ["Sorry :( no recipes found"]
            }];
        } else if (!Array.isArray(recipes)) {
            recipes = [recipes]
        }

        return recipes.map((element) => {
            return {
                recipe: element,
                offBy: 0
            }
        })
    }

    @Mutation(() => RecipeResponse)
    async writeRecipe(
        @Arg("title") title: string,
        @Ctx() { req }: Context
    ): Promise<RecipeResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            }
        }
        
        const user = await User.findOne({
            where: {
                id: req.session.userId
            },
            relations: {
                authoredRecipes: true
            }
        })
        if (!user) {
            return {
                errors: ["There was a problem with getting the user"]
            }
        }

        const recipe = Recipe.create({
            title,
            author: user,
            recipeIngredients: [],
            steps: []
        });
        user.authoredRecipes.push(recipe)
        await user.save()

        return {
            recipe
        }
    }

    @Mutation(() => RecipeIngredientResponse)
    async addRecipeIngredient(
        @Arg("input") input: RecipeIngredientInput,
        @Ctx() { req }: Context
    ): Promise<RecipeIngredientResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const recipe = await Recipe.findOne({
            where: {
                id: input.recipeId,
                authorId: req.session.userId
            },
            relations: ["recipeIngredients"]
        })
        if (!recipe) {
            return {
                errors: ["Recipe doesn't exist!"]
            };
        }

        const ingredient = await Ingredient.findOne({
            where: {name: input.name},
            relations: ["recipeIngredients"]
        })
        if (!ingredient) {
            return {
                errors: ["Ingredient doesn't exist!"]
            }
        }

        const recipeIngredient = RecipeIngredient.create({
            ...input,
            recipe,
            ingredient,
            ingredientId: ingredient.id
        })
        recipe.recipeIngredients.push(recipeIngredient)
        await recipe.save()
        ingredient.recipeIngredients.push(recipeIngredient)
        await ingredient.save()
        return {
            recipeIngredient
        };
    }

    @Mutation(() => RecipeRemoveResponse)
    async removeRecipeIngredient(
        @Arg("input") input: RecipeIngredientInput,
        @Ctx() { req }: Context
    ): Promise<RecipeRemoveResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const recipe = await Recipe.findOne({
            where: {
                id: input.recipeId,
                authorId: req.session.userId
            },
            relations: ["recipeIngredients"]
        })
        if (!recipe) {
            return {
                errors: ["Recipe doesn't exist"]
            };
        }

        for (const [, element] of recipe.recipeIngredients.entries()) {
            if (element.name === input.name) {
                await RecipeIngredient.delete(element.id);
                return {
                    removed: true
                }
            }
        }

        return {
            errors: ["Ingredient not found!"],
            removed: false
        }
    }

    @Mutation(() => RecipeStepResponse)
    async addRecipeStep(
        @Arg("input") input: RecipeStepInput,
        @Ctx() { req }: Context
    ): Promise<RecipeStepResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const recipe = await Recipe.findOne({
            where: {
                id: input.recipeId,
                authorId: req.session.userId
            },
            relations: ["steps"]
        })
        if (!recipe) {
            return {
                errors: ["Recipe doesn't exist"]
            };
        }

        const recipeStep = RecipeStep.create({
            ...input,
            recipe
        })
        recipe.steps.push(recipeStep)
        recipe.save()
        return {
            recipeStep
        };
    }

    @Mutation(() => RecipeRemoveResponse)
    async removeRecipeStep(
        @Arg("num") input: RecipeStepInput,
        @Ctx() { req }: Context
    ): Promise<RecipeRemoveResponse> {
        if (!req.session.userId) {
            return {
                errors: ["User is not logged in!"]
            };
        }

        const recipe = await Recipe.findOne({
            where: {
                id: input.recipeId,
                authorId: req.session.userId
            },
            relations: ["steps"]
        })
        if (!recipe) {
            return {
                errors: ["Recipe doesn't exist"]
            };
        }

        let detected = false;
        for (const [index, element] of recipe.steps.entries()) {
            if (index === input.stepNum - 1) {
                if (!detected) {
                    await RecipeStep.delete(element.id);
                    detected = true
                } else {
                    element.stepNum = element.stepNum - 1
                }
            }
        }
        await recipe.save()

        if (detected) {
            return {
                removed: true
            }
        }
        
        return {
            errors: ["Ingredient not found!"],
            removed: false
        }
    }
}