import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1640186633475 implements MigrationInterface {
    name = 'Migration1640186633475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "saves" integer NOT NULL DEFAULT '0', "recipeID" character varying NOT NULL, CONSTRAINT "PK_6afc9d3c2dbabf1f87da6c6b9bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailVerified"`);
        await queryRunner.query(`DROP TABLE "recipe_return"`);
    }

}
