import pg from "pg";

class MaterialsController {
    async getAllMaterials (req: any, res: any) {
        //console.log('materialsController/getMaterials BEFORE the query')
        //const allCategories = await db.query1('Select * from categories;');
        const text = 'Select * from materials;'
        let client = new pg.Client(process.env.DATABASE_URL);
        await client.connect();
        const allTasks = await client.query(text);
        res.status(200).json(allTasks.rows);
        await client.end();
        //const allCategories = await db.query1('Select * from categories;')
        //res.status(200).json(allCategories.rows);
        //res.json(categoriesAPI);
    }
}

module.exports = new MaterialsController();