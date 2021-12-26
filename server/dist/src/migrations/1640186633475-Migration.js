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
exports.Migration1640186633475 = void 0;
class Migration1640186633475 {
    constructor() {
        this.name = 'Migration1640186633475';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "recipe_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "saves" integer NOT NULL DEFAULT '0', "recipeID" character varying NOT NULL, CONSTRAINT "PK_6afc9d3c2dbabf1f87da6c6b9bc" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailVerified"`);
            yield queryRunner.query(`DROP TABLE "recipe_return"`);
        });
    }
}
exports.Migration1640186633475 = Migration1640186633475;
//# sourceMappingURL=1640186633475-Migration.js.map