import {Arg, Authorized, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../entity/user.entity";
import {UserInput} from "../inputs/user.input";
import {sign} from 'jsonwebtoken';
import {AuthenticationError} from "apollo-server-express";
import {compare} from 'bcrypt';
import {UserService} from "../service/user.service";

@Resolver(User)
export class UserResolver {

    constructor(private userService: UserService) {
    }

    @Authorized("ADMIN", "TEACHER")
    @Query(() => [User])
    async doFindUsers() {
        return this.userService.doFind();
    }

    @Query(() => User)
    async doLogin(@Arg("email") email: string, @Arg("password") password: string) {
        const user: User = await User.findOne(
            {
                where: {email: email}
            });

        if (!user) {
            throw new AuthenticationError('Login failed');
        }

        const match: boolean = await compare(password, user.password);

        if (!match) {
            throw new AuthenticationError('Login failed');
        }

        user.refreshToken = sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, 'TypeGraphQL', {expiresIn: '30d'});

        await User.update(user.id, user); // Update refresh token

        user.accessToken = sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, 'TypeGraphQL', {expiresIn: '15min'});

        return user;
    }

    @Mutation(() => User)
    async doRegister(@Arg("param") param: UserInput) {
        const user = User.create(param);
        user.refreshToken = sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, 'TypeGraphQL', {expiresIn: '30d'});
        user.accessToken = sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, 'TypeGraphQL', {expiresIn: '15min'});
        await user.save();

        return user;
    }
}
