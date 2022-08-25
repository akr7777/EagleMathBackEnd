import {categoriesAPI} from "../trashData/categories";
import {tasksAPI} from "../trashData/tasks";
import {log} from "util";

//const db = require('./../DataBaseAPI/db');
import pg from 'pg';

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
        //const allCategories = await db.query1('Select * from categories;');
        const text = 'Select * from categories;'
        let client = new pg.Client(process.env.DATABASE_URL);
        await client.connect();
        const allCategories = await client.query(text);
        console.log('allCategories.rows=', allCategories.rows)
        res.status(200).json(allCategories.rows);
        await client.end();
        //const allCategories = await db.query1('Select * from categories;')
        //console.log('allCategories.rows=', allCategories.rows)
        //res.status(200).json(allCategories.rows);
        //res.json(categoriesAPI);
    }
}

module.exports = new CategoriesController();