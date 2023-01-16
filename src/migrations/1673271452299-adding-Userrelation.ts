import { MigrationInterface, QueryRunner } from "typeorm";

export class addingUserrelation1673271452299 implements MigrationInterface {
    name = 'addingUserrelation1673271452299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL DEFAULT true, "password" character varying NOT NULL, "avatar" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
