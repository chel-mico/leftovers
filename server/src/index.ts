import { __prod__ } from "./constants";
import { createConnection, getConnectionOptions } from "typeorm";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, Root } from 'type-graphql';


const main = async () => {
    const options = await getConnectionOptions();
    const connection = await createConnection(options);
    await connection.runMigrations({
        transaction: "none"
    });

    const app = express();
    app.use('/graphql', graphqlHTTP({
        schema: await buildSchema({
            resolvers: ["dist/src/resolvers/*.js"],
            validate: false
        }),
        rootValue: Root,
        graphiql: true,
    }));
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main();

