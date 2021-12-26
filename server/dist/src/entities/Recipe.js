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
exports.Recipe = void 0;
const User_1 = require("./User");
const RecipeIngredient_1 = require("./RecipeIngredient");
const RecipeStep_1 = require("./RecipeStep");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let Recipe = class Recipe extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Recipe.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Recipe.prototype, "saves", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recipe.prototype, "authorID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, author => author.authoredRecipes),
    __metadata("design:type", User_1.User)
], Recipe.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeIngredient_1.RecipeIngredient, ingredient => ingredient.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "recipeIngredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeStep_1.RecipeStep, steps => steps.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "steps", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Recipe.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Recipe.prototype, "updatedAt", void 0);
Recipe = __decorate([
    (0, typeorm_1.Entity)()
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=Recipe.js.map