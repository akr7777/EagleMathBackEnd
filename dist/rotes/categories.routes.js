"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const categoriesController = require('./../controllers/categories.controller');
exports.router.get('/getAllCategories', categoriesController.getAllCategories);
module.exports = exports.router;
