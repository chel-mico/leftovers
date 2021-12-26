"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const ingredient_1 = require("./resolvers/ingredient");
const user_1 = require("./resolvers/user");
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./constants");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongodb_1 = require("mongodb");
const apollo_server_express_1 = require("apollo-server-express");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield (0, typeorm_1.getConnectionOptions)();
    const connection = yield (0, typeorm_1.createConnection)(options);
    yield connection.runMigrations({
        transaction: "none"
    });
    const app = (0, express_1.default)();
    const mongo = yield mongodb_1.MongoClient.connect(constants_1.constants.__cache__);
    app.use((0, express_session_1.default)({
        name: 'qid',
        store: new connect_mongo_1.default({
            client: mongo,
            dbName: "leftovers-cache",
            autoRemove: 'disabled'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.constants.__prod__
        },
        secret: constants_1.constants.__secret__,
        resave: false
    }));
    let server = null;
    function startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            server = new apollo_server_express_1.ApolloServer({
                schema: yield (0, type_graphql_1.buildSchema)({
                    resolvers: [
                        ingredient_1.IngredientResolver,
                        user_1.UserResolver
                    ],
                    validate: true
                }),
                context: ({ req, res }) => ({
                    req,
                    res,
                    mongo
                })
            });
            yield server.start();
            server.applyMiddleware({ app });
        });
    }
    startServer();
    app.listen(constants_1.constants.__port__, () => {
        console.log(`server started at port ${constants_1.constants.__port__}`);
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map