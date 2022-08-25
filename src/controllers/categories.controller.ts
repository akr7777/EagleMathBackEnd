import {categoriesAPI} from "../trashData/categories";
import {tasksAPI} from "../trashData/tasks";

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
    async getAllCategories (req: any, res: any) {
        //console.log('materialsController/getMaterials BEFORE the query')
        const allCategories = await db.query1('Select * from materials;')
        console.log('materialsController/getMaterials AFTER the query, allMaterials=',allCategories)
        res.status(200).json(allCategories.rows);
        //res.json(categoriesAPI);
    }
}

module.exports = new CategoriesController();