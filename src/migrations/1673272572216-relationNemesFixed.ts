import { MigrationInterface, QueryRunner } from "typeorm";

export class relationNemesFixed1673272572216 implements MigrationInterface {
    name = 'relationNemesFixed1673272572216'

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
