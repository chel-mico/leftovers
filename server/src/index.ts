import { createConnection, getConnectionOptions } from "typeorm";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { IngredientResolver } from "./resolvers/ingredient";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { constants } from "./constants";

const main = async () => {
    const options = await getConnectionOptions();
    const connection = await createConnection(options);
    await connection.runMigrations({
        transaction: "none"
    });
    //await connection.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true
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

    app.use('/graphiql', graphqlHTTP(async (req, res) => {
        return {
            schema: await buildSchema({
                resolvers: [
                    IngredientResolver,
                    UserResolver
                ],
                validate: true
            }),
            context: { 
                req,
                res,
                redis
            },
            graphiql: true
        }
    }));
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});

