import { __prod__ } from "./constants";
import { createConnection, getConnectionOptions } from "typeorm";

const main = async () => {
    const options = await getConnectionOptions();
    const conn = await createConnection(options);
    
};

main();

