import pg from 'pg';

class CategoriesController {
    async getAllCategories (req: any, res: any) {
        const text = 'Select * from categories;'
        let client = new pg.Client(process.env.DATABASE_URL);
        await client.connect();
        const allCategories = await client.query(text);
        res.status(200).json(allCategories.rows);
        await client.end();
    }
}

module.exports = new CategoriesController();