import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";

const express = require('express');
import {buildSchema} from "type-graphql";
import {BookResolver} from "./resolvers/book.resolver";
import {UserResolver} from "./resolvers/user.resolver";
import {createConnection} from "typeorm";

/**
 * https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/
 * https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#how-migrations-work
 */
const main = async () => {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [BookResolver, UserResolver]
    });

    const apolloServer = new ApolloServer({schema});
    const app = express();
    apolloServer.applyMiddleware({app});

    app.listen(8080, () => {
        console.log("Server started on http://localhost:8080/graphql");
    });
};

main().then(error => console.error(error));
