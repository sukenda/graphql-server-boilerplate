import {InputType, Field} from "type-graphql";
import {IsEmail} from "class-validator";

@InputType()
export class UserInput {

    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;

    @Field(type => [String], {nullable: true})
    roles?: string[];

}
