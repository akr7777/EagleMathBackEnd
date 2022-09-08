import pg from 'pg';
import {dbConfig, dbConnectionURL} from "../DataBaseAPI/dbConnect";

class CategoriesController {
    async getAllCategories (req: any, res: any) {
        console.log('CategoriesController / getAllCategories')
        const text = 'Select * from categories;'
        //let client = new pg.Client(process.env.DATABASE_URL);
        let client = new pg.Client(process.env.DATABASE_URL);
        console.log('CategoriesController / getAllCategories before connection');
        await client.connect();
        console.log('CategoriesController / getAllCategories after connection');
        const allCategories = await client.query(text);
        res.status(200).json(allCategories.rows);
        await client.end();
    }
}

module.exports = new CategoriesController();