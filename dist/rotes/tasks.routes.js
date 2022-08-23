"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const tasksController = require('./../controllers/tasks.controller');
exports.router.get('/getAllTasks', tasksController.getAllTasks);
//router.get('/getAllCategories', tasksController.getAllCategories);
module.exports = exports.router;
