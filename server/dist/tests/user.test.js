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
const testHelper_1 = require("./testHelper");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testHelper_1.TestHelper.instance.setupTestDB();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testHelper_1.TestHelper.instance.clear();
}));
afterAll(() => {
    testHelper_1.TestHelper.instance.teardownTestDB();
});
describe('User Tests', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
//# sourceMappingURL=user.test.js.map