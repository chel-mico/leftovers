import { Ingredient } from "src/entities/Ingredient";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class IngredientResolver {
    @Query(() => [Ingredient])
    ingredients() {
        return "name here";
    }
}