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
import cors from 'cors';
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageProductionDefault
} from "apollo-server-core";
import { FridgeResolver } from "./resolvers/fridge";

const main = async () => {
    const options = await getConnectionOptions();
    const connection = await createConnection(options);
    await connection.runMigrations({
        transaction: "none"
    });

    const app = express();

    const mongo = await MongoClient.connect(constants.__cache__);

    const whitelist = ['http://localhost:3000'] //studio.apollographql.com lets me test the API locally

    app.use(
        cors({
            origin: whitelist,
            credentials: true
        })
    );

    app.use(
        session({
            name: constants.__cookie__,
            store: MongoStore.create({ 
                mongoUrl: constants.__cache__,
                dbName: "leftovers-cache",
                autoRemove: 'disabled',
                crypto: {
                    secret: constants.__secret__
                }
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, //one week
                httpOnly: true,
                sameSite: 'lax', //csrf
                secure: constants.__prod__ //works only in https
            },
            secret: constants.__secret__,
            resave: false,
            saveUninitialized: true
        })
    )

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                IngredientResolver,
                UserResolver,
                FridgeResolver
            ],
            validate: true
        }),
        context: ({req, res}) => ({ 
            req,
            res,
            mongo
        }),
        plugins: [
            constants.__prod__
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: "my-graph-id@my-graph-variant",
                footer: false,
            })
            : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();
    server.applyMiddleware({ 
        app,
        cors: false
    });

    app.listen(constants.__port__, () => {
        console.log(`server started at port ${constants.__port__}`);
    });
};

main().catch((err) => {
    console.error(err);
});

