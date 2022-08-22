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
const categories_1 = require("../trashData/categories");
const tasks_1 = require("../trashData/tasks");
const db = require('./../DataBaseAPI/db');
class TasksController {
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* console.log('materialsController/getMaterials BEFORE the query')
             const allMaterials = await db.query1('Select * from materials;')
             console.log('materialsController/getMaterials AFTER the query, allMaterials=',allMaterials)
             res.json(allMaterials.rows);*/
            res.json(tasks_1.tasksAPI);
        });
    }
    getAllCategories(req, res) {
        res.json(categories_1.categoriesAPI);
    }
}
module.exports = new TasksController();
