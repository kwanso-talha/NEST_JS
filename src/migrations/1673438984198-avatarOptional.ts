import { MigrationInterface, QueryRunner } from "typeorm";

export class avatarOptional1673438984198 implements MigrationInterface {
    name = 'avatarOptional1673438984198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`);
    }

}
