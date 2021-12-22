import { createConnection, getConnectionOptions } from "typeorm";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { IngredientResolver } from "./resolvers/ingredient";
import { UserResolver } from "./resolvers/user";


const main = async () => {
    const options = await getConnectionOptions();
    const connection = await createConnection(options);
    await connection.runMigrations({
        transaction: "none"
    });
    //await connection.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    const app = express();
    app.use('/graphiql', graphqlHTTP({
        schema: await buildSchema({
            resolvers: [
                IngredientResolver,
                UserResolver
            ],
            validate: true
        }),
        graphiql: true
    }));
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});

