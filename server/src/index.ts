import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import config from './mikro-orm.config';

const main = async () => {
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up();
    const user = orm.em.create(User, {
        username: "ok",
        email: "endreasy@gmail.com",
        password: "bbbbb"
    });
    await orm.em.persistAndFlush(user);
};

main();

