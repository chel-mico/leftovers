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
exports.RecipeIngredient = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./Ingredient");
const Recipe_1 = require("./Recipe");
let RecipeIngredient = class RecipeIngredient extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RecipeIngredient.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], RecipeIngredient.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], RecipeIngredient.prototype, "measurement", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], RecipeIngredient.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeIngredient.prototype, "ingredientID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Ingredient_1.Ingredient, ingredient => ingredient.recipeIngredients),
    __metadata("design:type", Ingredient_1.Ingredient)
], RecipeIngredient.prototype, "ingredient", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeIngredient.prototype, "recipeID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Recipe_1.Recipe, recipe => recipe.recipeIngredients),
    __metadata("design:type", Recipe_1.Recipe)
], RecipeIngredient.prototype, "recipe", void 0);
RecipeIngredient = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], RecipeIngredient);
exports.RecipeIngredient = RecipeIngredient;
//# sourceMappingURL=RecipeIngredient.js.map