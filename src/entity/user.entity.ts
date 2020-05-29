import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {v4 as uuid} from 'uuid';
import {hashSync} from 'bcrypt';

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column("varchar", {length: 255, unique: true})
    email: string;

    @Column("text")
    password: string;

    @Field(() => Date)
    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createdTime: Date;

    @Field(() => String)
    @Column({type: 'varchar', length: 300, nullable: true})
    createdBy: string;

    @Field(() => [String])
    @Column('varchar', {array: true})
    roles: string[];

    @Column("text")
    @Field(() => String)
    refreshToken: string

    @Field(() => String)
    accessToken: string

    @BeforeInsert()
    before() {
        if (!this.createdBy) {
            this.createdBy = uuid()
        }

        if (!this.roles) {
            this.roles = new Array("GUEST")
        }

        this.password = hashSync(this.password, 12);
    }

}
