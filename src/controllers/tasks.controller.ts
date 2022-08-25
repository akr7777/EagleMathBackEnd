import {categoriesAPI} from "../trashData/categories";
import {tasksAPI} from "../trashData/tasks";
import pg from "pg";

//const db = require('./../DataBaseAPI/db');

class TasksController {
    /*async getAllTasks(req: any, res: any) {
       /!* console.log('materialsController/getMaterials BEFORE the query')
        const allMaterials = await db.query1('Select * from materials;')
        console.log('materialsController/getMaterials AFTER the query, allMaterials=',allMaterials)
        res.json(allMaterials.rows);*!/
        res.json(tasksAPI);
    }*/
    /*getAllCategories(req:any, res:any) {
        res.json(categoriesAPI)
    }*/
    async getAllTasks (req: any, res: any) {
        //console.log('materialsController/getMaterials BEFORE the query')
        //const allCategories = await db.query1('Select * from categories;');
        const text = 'Select * from tasks;'
        let client = new pg.Client(process.env.DATABASE_URL);
        await client.connect();
        const allTasks = await client.query(text);
        //console.log('allCategories.rows=', allCategories.rows)
        res.status(200).json(allTasks.rows);
        await client.end();
        //const allCategories = await db.query1('Select * from categories;')
        //console.log('allCategories.rows=', allCategories.rows)
        //res.status(200).json(allCategories.rows);
        //res.json(categoriesAPI);
    }
}

module.exports = new TasksController();