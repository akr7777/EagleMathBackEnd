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
const db = require('./../DataBaseAPI/db');
class CategoriesController {
    /*async getAllTasks(req: any, res: any) {
       /!* console.log('materialsController/getMaterials BEFORE the query')
        const allMaterials = await db.query1('Select * from materials;')
        console.log('materialsController/getMaterials AFTER the query, allMaterials=',allMaterials)
        res.json(allMaterials.rows);*!/
        res.json(categoriesAPI);
    }*/
    /*async getAllCategories(req:any, res:any) {
        //res.json(categoriesAPI)
    }*/
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('materialsController/getMaterials BEFORE the query')
            const allCategories = yield db.query1('Select * from materials;');
            //console.log('materialsController/getMaterials AFTER the query, allMaterials=',allCategories)
            console.log('allCategories.rows=', allCategories.rows);
            res.status(200).json(allCategories.rows);
            //res.json(categoriesAPI);
        });
    }
}
module.exports = new CategoriesController();
