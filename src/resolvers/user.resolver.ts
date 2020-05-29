import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../entity/user.entity";
import {CreateUserInput} from "../inputs/create.user.input";

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async doFindUsers() {
        return User.find()
    }

    @Mutation(() => User)
    async doRegister(@Arg("data") data: CreateUserInput) {
        const user = User.create(data);
        await user.save();
        return user;
    }
}
