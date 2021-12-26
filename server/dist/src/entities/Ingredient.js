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
exports.Ingredient = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const FridgeIngredient_1 = require("./FridgeIngredient");
const RecipeIngredient_1 = require("./RecipeIngredient");
let Ingredient = class Ingredient extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Ingredient.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeIngredient_1.RecipeIngredient, recipeIngredients => recipeIngredients.ingredient),
    __metadata("design:type", Array)
], Ingredient.prototype, "recipeIngredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FridgeIngredient_1.FridgeIngredient, fridgeIngredients => fridgeIngredients.ingredient),
    __metadata("design:type", Array)
], Ingredient.prototype, "fridgeIngredients", void 0);
Ingredient = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Ingredient);
exports.Ingredient = Ingredient;
//# sourceMappingURL=Ingredient.js.map