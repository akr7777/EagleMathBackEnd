"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const descriptionController = require('./../controllers/description.controller');
exports.router.post('/setDescription', descriptionController.setDescription);
exports.router.get('/getDescription', descriptionController.getDescription);
//router.get('/getAllCategories', tasksController.getAllCategories);
//sfdjh
module.exports = exports.router;
