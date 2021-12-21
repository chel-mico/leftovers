import { __prod__ } from "./constants";
import { createConnection, getConnectionOptions } from "typeorm";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { IngredientResolver } from "./resolvers/ingredient";


const main = async () => {
    const options = await getConnectionOptions();
    const connection = await createConnection(options);
    await connection.runMigrations({
        transaction: "none"
    });

    const app = express();
    app.use('/graphiql', graphqlHTTP({
        schema: await buildSchema({
            resolvers: [
                IngredientResolver
            ],
            validate: false
        }),
        //rootValue: Root,
        graphiql: true,
        context: () => ({ em: connection.manager })
    }));
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});

