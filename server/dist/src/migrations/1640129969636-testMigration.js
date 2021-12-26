"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMigration1640129969636 = void 0;
class testMigration1640129969636 {
    constructor() {
        this.name = 'testMigration1640129969636';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "savedRecipes" text array NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "recipeID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD "authorID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "measurement" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "ingredientID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "recipeID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "ingredientID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "fridgeID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "fridge" ADD "ownerID" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_1370c876f9d4a525a45a9b50d81"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7522f14622518f2125476192d25"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_7522f14622518f2125476192d2"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fridgeId"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "fridgeId" uuid`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7522f14622518f2125476192d25" UNIQUE ("fridgeId")`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP CONSTRAINT "FK_1c52f396004dadfb9357f762268"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP CONSTRAINT "PK_654c0969ac0899d321c00ea0eaf"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD CONSTRAINT "PK_654c0969ac0899d321c00ea0eaf" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "recipeId"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "recipeId" uuid`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_1ad3257a7350c39854071fba211"`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "PK_e365a2fedf57238d970e07825ca"`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "saves" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorId"`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD "authorId" uuid`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_2879f9317daa26218b5915147e7"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "quantity"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "quantity" double precision NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "ingredientId"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "ingredientId" uuid`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "recipeId"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "recipeId" uuid`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP CONSTRAINT "FK_0238d4f6f93a9bb181dfe091e49"`);
            yield queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "PK_6f1e945604a0b59f56a57570e98"`);
            yield queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "ingredient" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP CONSTRAINT "FK_2646b560f38b14d71d30727a2de"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP CONSTRAINT "PK_bec6c95d9b48260154718b329dd"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD CONSTRAINT "PK_bec6c95d9b48260154718b329dd" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "ingredientId"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "ingredientId" uuid`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "fridgeId"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "fridgeId" uuid`);
            yield queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56"`);
            yield queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "fridge" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7522f14622518f2125476192d25" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD CONSTRAINT "FK_1c52f396004dadfb9357f762268" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_1370c876f9d4a525a45a9b50d81" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_2879f9317daa26218b5915147e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_1ad3257a7350c39854071fba211" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD CONSTRAINT "FK_0238d4f6f93a9bb181dfe091e49" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD CONSTRAINT "FK_2646b560f38b14d71d30727a2de" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP CONSTRAINT "FK_2646b560f38b14d71d30727a2de"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP CONSTRAINT "FK_0238d4f6f93a9bb181dfe091e49"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_1ad3257a7350c39854071fba211"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_2879f9317daa26218b5915147e7"`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_1370c876f9d4a525a45a9b50d81"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP CONSTRAINT "FK_1c52f396004dadfb9357f762268"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7522f14622518f2125476192d25"`);
            yield queryRunner.query(`ALTER TABLE "fridge" DROP CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56"`);
            yield queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "fridge" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "fridge" ADD CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "fridgeId"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "fridgeId" integer`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "ingredientId"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "ingredientId" integer`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP CONSTRAINT "PK_bec6c95d9b48260154718b329dd"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD CONSTRAINT "PK_bec6c95d9b48260154718b329dd" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD CONSTRAINT "FK_2646b560f38b14d71d30727a2de" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "PK_6f1e945604a0b59f56a57570e98"`);
            yield queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "ingredient" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" ADD CONSTRAINT "FK_0238d4f6f93a9bb181dfe091e49" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "recipeId"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "recipeId" integer`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "ingredientId"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "ingredientId" integer`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "quantity"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "quantity" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_2879f9317daa26218b5915147e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorId"`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD "authorId" integer`);
            yield queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "saves" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "PK_e365a2fedf57238d970e07825ca"`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_1ad3257a7350c39854071fba211" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "recipeId"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "recipeId" integer`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP CONSTRAINT "PK_654c0969ac0899d321c00ea0eaf"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD CONSTRAINT "PK_654c0969ac0899d321c00ea0eaf" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD CONSTRAINT "FK_1c52f396004dadfb9357f762268" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7522f14622518f2125476192d25"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fridgeId"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "fridgeId" integer`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_7522f14622518f2125476192d2" UNIQUE ("fridgeId")`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7522f14622518f2125476192d25" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_1370c876f9d4a525a45a9b50d81" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "fridge" DROP COLUMN "ownerID"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "fridgeID"`);
            yield queryRunner.query(`ALTER TABLE "fridge_ingredient" DROP COLUMN "ingredientID"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "recipeID"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "ingredientID"`);
            yield queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "measurement"`);
            yield queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorID"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" DROP COLUMN "recipeID"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "savedRecipes"`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "recipe_step" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
}
exports.testMigration1640129969636 = testMigration1640129969636;
//# sourceMappingURL=1640129969636-testMigration.js.map