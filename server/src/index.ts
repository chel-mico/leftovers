import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
//import { Item } from "./entities/Item";
import config from './mikro-orm.config';

const main = async () => {
    const orm = await MikroORM.init(config);
};

main();

