import { __prod__ } from "./constants";
import { Ingredient } from "./entities/Ingredient";
import { Options } from "@mikro-orm/core";

const config: Options = {
    entities: [Ingredient],
    dbName: "leftovers",
    type: "postgresql",
    debug: !__prod__
};

export default config;