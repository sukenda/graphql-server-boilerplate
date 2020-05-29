import {InputType, Field} from "type-graphql";
import {IsEmail} from "class-validator";

@InputType()
export class CreateUserInput {

    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;

}
