import {Query, Resolver} from "type-graphql";
import {User} from "../entity/user.entity";

@Resolver()
export class UserResolver {

    @Query(() => [User])
    users() {
        return User.find()
    }
}
