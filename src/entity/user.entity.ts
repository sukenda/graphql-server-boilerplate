import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", {length: 255})
    email: string;

    @Column("text")
    password: string;

    @Field(() => Date)
    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createdTime: Date;

    @Field(() => String)
    @Column({type: 'varchar', length: 300, nullable: true})
    createdBy: string;

}
