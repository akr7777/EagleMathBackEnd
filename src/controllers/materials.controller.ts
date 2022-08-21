import {materialsAPI} from "../trashData/materials";
import {categoriesAPI} from "../trashData/categories";

const db = require('./../DataBaseAPI/db');

class MaterialsController {
    async getMaterials(req: any, res: any) {
       /* console.log('materialsController/getMaterials BEFORE the query')
        const allMaterials = await db.query1('Select * from materials;')
        console.log('materialsController/getMaterials AFTER the query, allMaterials=',allMaterials)
        res.json(allMaterials.rows);*/
        res.json(materialsAPI);
    }
    getCategories(req:any, res:any) {
        res.json(categoriesAPI)
    }
}

module.exports = new MaterialsController();