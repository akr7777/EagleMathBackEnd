import pg from 'pg';

class DescriptionController {
    async getDescription (req: any, res: any) {
        try {
            const SQL = `SELECT * FROM description;`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            if (dbData.rows.length === 1) {
                const response = {
                    title: dbData.rows[0].title,
                    photo: dbData.rows[0].photo,
                    description: dbData.rows[0].description,
                    resultCode: 0,
                }
                res.status(200).json(response);
            } else {
                res.status(400).json({resultCode: 2});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!DescriptionController / getDescription / erorr=!!!!', e)

        }
    }

}

module.exports = new DescriptionController();