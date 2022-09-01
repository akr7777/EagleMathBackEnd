import pg from 'pg';
import path from "path";
const pathToUploadsDir = './src/public/uploads/';
const pathToFolder = '/app';

class DescriptionController {
    async getDescription(req: any, res: any) {
        try {
            //console.log('DescriptionController / getDescription')
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

    async setDescription(req: any, res: any) {
        const {title, photo, description} = req.body;
        const SQL = `UPDATE description SET title='${title}', photo='${photo}', description='${description}';`

        try {
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            //console.log('setDescription / dbData.rowCount=', dbData.rowCount)
            if (dbData.rowCount) {
               const response = {
                    title: title,
                    photo: photo,
                    description: description,
                    resultCode: 0,
                }
                //res.status(200).json(response);
                res.status(200).json(response);
            } else {
                res.status(400).json({resultCode: 2});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!DescriptionController / getDescription / erorr=!!!!', e)

        }
    }

    async getDescriptionPhoto(req: any, res: any) {
        try {
            const SQL = `SELECT photo FROM description;`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            if (dbData.rows.length === 1) {
                const photo = dbData.rows[0].photo;
                const fullDir = path.join(pathToFolder, photo);
                res.status(200).sendFile(fullDir);
            } else {
                const standartPhoto = path.join(pathToFolder, pathToUploadsDir);
                res.status(200).sendFile(standartPhoto);
            }
            await client.end();
        } catch (e) {
            console.log('!!!!!Descr Controller / getDescriptionPhoto Dbase / erorr=!!!!', e)
        }
    }

    async setDescriptionPhoto(req: any, res: any) {
        try {
            const file = req.files.file;
            const fileExt = file.name.split('.')[file.name.split('.').length-1];
            const descriptionPhotoLocation = path.join(pathToUploadsDir, 'descriptionPhoto.' + fileExt);
            //console.log('descrController / setDescriptionPhoto/ descriptionPhotoLocation=', descriptionPhotoLocation)
            try {
                await file.mv(descriptionPhotoLocation);
            } catch (e) {
                console.log('FILE!!! e= ',e)
            }

            try {
                const SQL = `UPDATE description SET photo='${descriptionPhotoLocation}';`
                //console.log('descrController / setDescriptionPhoto/ SQL=', SQL)
                let client = new pg.Client(process.env.DATABASE_URL);
                await client.connect();
                const dbData = await client.query(SQL);
                //console.log('descrController / setDescriptionPhoto/ dbData=', dbData)

                if (dbData.rows.length === 1) {
                    res.status(200).json({resultCode: 0});
                } else {
                    res.status(400).json({resultCode: 1});
                }
                await client.end();
            } catch (e) {
                console.log('!!!!!descriptionController / setDescriptionPhoto / erorr=!!!!', e)
            }
        } catch (e) {
            console.log('!!!descrCOntroller, setDescriptionPhoto, FInal error = ', e)
        }
    }
}

module.exports = new DescriptionController();