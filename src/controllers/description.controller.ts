import pg from 'pg';

class DescriptionController {
    async getDescription(req: any, res: any) {
        try {
            console.log('DescriptionController / getDescription')
            const SQL = `SELECT * FROM description;`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            console.log('DescriptionController / getDescription / dbData=', dbData)


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

    async setDescription(req: any, res: any) {
        const {title, photo, description} = req.body;
        const SQL = `UPDATE description SET title='${title}', photo='${photo}', description='${description}';`

        console.log('setDescription, SQL =', SQL);

        try {
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            console.log('dbData=', dbData)
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