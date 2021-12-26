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
exports.Migration1640296491200 = void 0;
class Migration1640296491200 {
    constructor() {
        this.name = 'Migration1640296491200';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailVerified"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "email" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        });
    }
}
exports.Migration1640296491200 = Migration1640296491200;
//# sourceMappingURL=1640296491200-Migration.js.map