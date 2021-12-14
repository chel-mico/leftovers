import { MikroORM } from "@mikro-orm/core";
import { Ingredient } from "./entities/Ingredient";
import { User } from "./entities/User";
import { Fridge } from "./entities/Fridge";
import { FridgeIngredient } from "./entities/FridgeIngredient";
import { Recipe } from "./entities/Recipe";
import { RecipeIngredient } from "./entities/RecipeIngredient";
import { __prod__ } from "./constants";
import path from 'path';
import { RecipeStep } from "./entities/RecipeStep";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern:  /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Ingredient, Fridge, FridgeIngredient, Recipe, RecipeIngredient, RecipeStep, User],
    dbName: "leftovers",
    password: "iatwima4!",
    type: "postgresql",
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];