import {categoriesAPI} from "../trashData/categories";
import {tasksAPI} from "../trashData/tasks";

const db = require('./../DataBaseAPI/db');

class TasksController {
    async getAllTasks(req: any, res: any) {
       /* console.log('materialsController/getMaterials BEFORE the query')
        const allMaterials = await db.query1('Select * from materials;')
        console.log('materialsController/getMaterials AFTER the query, allMaterials=',allMaterials)
        res.json(allMaterials.rows);*/
        res.json(tasksAPI);
    }
    getAllCategories(req:any, res:any) {
        res.json(categoriesAPI)
    }
}

module.exports = new TasksController();