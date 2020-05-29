import "reflect-metadata";
import {ApolloServer, AuthenticationError} from "apollo-server-express";

const express = require('express');
import {buildSchema} from "type-graphql";
import {BookResolver} from "./resolvers/book.resolver";
import {UserResolver} from "./resolvers/user.resolver";
import {createConnection} from "typeorm";
import {authChecker} from "./auth/auth-checker";
import {verify} from 'jsonwebtoken';
import * as jwt from 'express-jwt';

const main = async () => {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [BookResolver, UserResolver],
        authChecker: authChecker,
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({req}) => {
            const token = req.headers.authorization || '';
            if (!token) {
               return;
            }

            const user = verify(token.replace("Bearer ", ""), 'TypeGraphQL');
            if (!user) throw new AuthenticationError('Jwt  expired');
            return {user};
        },
    },);

    const app = express();
    const path = "/graphql";

    app.use(
        path,
        jwt({
            secret: 'TypeGraphQL',
            credentialsRequired: false,
        }),)

    apolloServer.applyMiddleware({app, path});

    app.listen({port: 8080}, () =>
        console.log(`🚀 Server ready at http://localhost:8080${apolloServer.graphqlPath}`),
    );
};

main().then(error => console.error(error));
