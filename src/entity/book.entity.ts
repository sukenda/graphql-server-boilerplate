import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class Book extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @Column()
    author: string;

    @Field(() => Boolean)
    @Column({ default: false })
    isPublished: boolean;

}
