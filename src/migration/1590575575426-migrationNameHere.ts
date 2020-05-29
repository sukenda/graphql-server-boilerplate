import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationNameHere1590575575426 implements MigrationInterface {
    name = 'migrationNameHere1590575575426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "server-boilerplate"."book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "isPublished" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e388020d5842fd438fdeeb56d5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server-boilerplate"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" text NOT NULL, "createdTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300), CONSTRAINT "PK_9be84f931d80f2aec73c023bc36" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "server-boilerplate"."user"`);
        await queryRunner.query(`DROP TABLE "server-boilerplate"."book"`);
    }

}
