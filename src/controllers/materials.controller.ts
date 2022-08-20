const db = require('./../DataBaseAPI/db');

class MaterialsController {
    async getMaterials(req: any, res: any) {
        console.log('materialsController/getMaterials BEFORE the query')
        const allMaterials = db.query1('Select * from materials;')
        console.log('materialsController/getMaterials AFTER the query, allMaterials=',allMaterials)
        res.json(allMaterials.rows);
    }
}

module.exports = new MaterialsController();