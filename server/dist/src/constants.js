"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const config_json_1 = __importDefault(require("../config.json"));
exports.constants = {
    __prod__: config_json_1.default.NODE_ENV === 'production',
    __secret__: config_json_1.default.SECRET,
    __cache__: config_json_1.default.CACHE,
    __port__: parseInt(config_json_1.default.PORT)
};
//# sourceMappingURL=constants.js.map