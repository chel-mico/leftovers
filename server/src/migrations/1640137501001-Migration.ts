import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1640137501001 implements MigrationInterface {
    name = 'Migration1640137501001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "savedRecipes" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "savedRecipes" DROP DEFAULT`);
    }

}
