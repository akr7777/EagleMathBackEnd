"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const materialsController = require('./../controllers/materials.controller');
exports.router.get('/getAllMaterials', materialsController.getMaterials);
module.exports = exports.router;
