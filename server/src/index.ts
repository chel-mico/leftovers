import { createConnection, getConnectionOptions } from "typeorm";
import express from 'express';
import { buildSchema } from 'type-graphql';
import { IngredientResolver } from "./resolvers/ingredient";
import { UserResolver } from "./resolvers/user";
import session from 'express-session';
import { constants } from "./constants";
import MongoStore from "connect-mongo";
import { MongoClient } from "mongodb"
import { ApolloServer } from "apollo-server-express";

const main = async () => {
    const options = await getConnectionOptions();
    const connection = await createConnection(options);
    await connection.runMigrations({
        transaction: "none"
    });

    const app = express();

    const mongo = await MongoClient.connect(constants.__cache__);

    app.use(
        session({
            name: 'qid',
            store: new MongoStore({ 
                client: mongo,
                dbName: "leftovers-cache",
                autoRemove: 'disabled'
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, //one week
                httpOnly: true,
                sameSite: 'lax', //csrf
                secure: constants.__prod__ //works only in https
            },
            secret: constants.__secret__, //remember to set a secret in .env
            resave: false
        })
    )

    let server = null;
    async function startServer() {
        server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [
                    IngredientResolver,
                    UserResolver
                ],
                validate: true
            }),
            context: ({req, res}) => ({ 
                req,
                res,
                mongo
            })
        });
        await server.start();
        server.applyMiddleware({ app });
    }
    startServer();

    app.listen(constants.__port__, () => {
        console.log(`server started at port ${constants.__port__}`);
    });
};

main().catch((err) => {
    console.error(err);
});

