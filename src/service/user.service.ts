import {Repository} from "typeorm";
import {User} from "../entity/user.entity";

export class UserService {

    constructor(private readonly userRepository: Repository<User>) {
    }

    async doLogin(): Promise<User | null> {
        return null;
    }

    async doFind(): Promise<Array<User>> {
        return this.userRepository.find();
    }

}
