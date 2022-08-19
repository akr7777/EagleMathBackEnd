const db = require('./../DataBaseAPI/db');

class MaterialsController {
    async getMaterials(req: any, res: any) {
        console.log('materialsController/getMaterials before')
        //const allMaterials = await db.query(`SELECT * FROM materials;`);
        const allMaterials = db.query1('Select * from materials;')
        res.json(allMaterials.rows);
    }
}

module.exports = new MaterialsController();