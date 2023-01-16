import { MigrationInterface, QueryRunner } from "typeorm";

export class addingCNIC1672991964744 implements MigrationInterface {
    name = 'addingCNIC1672991964744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "CNIC" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "CNIC"`);
    }

}
