import { __prod__ } from "./constants";
import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "./entities/User";

const main = async () => {
    const options = await getConnectionOptions();
    const conn = await createConnection(options);
};

main();

