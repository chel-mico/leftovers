"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FridgeIngredient = void 0;
const Ingredient_1 = require("./Ingredient");
const Fridge_1 = require("./Fridge");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let FridgeIngredient = class FridgeIngredient extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], FridgeIngredient.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FridgeIngredient.prototype, "measurement", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], FridgeIngredient.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FridgeIngredient.prototype, "ingredientID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Ingredient_1.Ingredient, ingredient => ingredient.fridgeIngredients),
    __metadata("design:type", Ingredient_1.Ingredient)
], FridgeIngredient.prototype, "ingredient", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FridgeIngredient.prototype, "fridgeID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Fridge_1.Fridge, fridge => fridge.fridgeIngredients),
    __metadata("design:type", Fridge_1.Fridge)
], FridgeIngredient.prototype, "fridge", void 0);
FridgeIngredient = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], FridgeIngredient);
exports.FridgeIngredient = FridgeIngredient;
//# sourceMappingURL=FridgeIngredient.js.map