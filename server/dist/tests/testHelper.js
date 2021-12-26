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
exports.TestHelper = void 0;
const typeorm_1 = require("typeorm");
class TestHelper {
    constructor() { }
    static get instance() {
        if (!this._instance)
            this._instance = new TestHelper();
        return this._instance;
    }
    setupTestDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbConnect = yield (0, typeorm_1.createConnection)({
                type: 'postgres',
                database: 'tests',
                username: 'postgres',
                password: 'iatwima4!',
                entities: ["src/entities/**/*.ts"],
                synchronize: true
            });
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnect.dropDatabase();
        });
    }
    teardownTestDB() {
        this.dbConnect.close();
    }
}
exports.TestHelper = TestHelper;
//# sourceMappingURL=testHelper.js.map