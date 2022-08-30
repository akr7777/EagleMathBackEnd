import pg from 'pg';
const fs = require('fs');
//const path = require('path');
const pathToUploadsDir = './src/public/uploads/';

/*const checkFileExist = (path: string) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else
            return false;
    } catch(err) {
        console.error('checkFileExist:::::', err);
        return false;
    }
}*/
/*const checkDirExist = (path: string) => {
    fs.stat(path, function(err:any) {
        if (!err) {
            console.log('Директория есть', path);
        }
        else if (err.code === 'ENOENT') {
            console.log('директории нет', path);
        }
    });
}*/


class UsersController {
    async login(req: any, res: any) {
        const {email, password} = req.body;

        try {
            const SQL = `SELECT * FROM USERS WHERE email='${email}' AND password='${password}';`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            if (dbData.rows.length === 1) {
                const response = {
                    id: dbData.rows[0].id,
                    name: dbData.rows[0].name,
                    email: dbData.rows[0].email,
                    isAdmin: dbData.rows[0].isadmin,
                    photo: dbData.rows[0].photo,
                    resultCode: 0,
                }
                res.status(200).json(response);
            } else {
                res.status(400).json({resultCode: 1});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / login / erorr=!!!!', e)
        }
    }

    async getUser(req: any, res: any) {
        console.log('UsersController / getUser');
        res.json({id: 0, name: 'sfd'});
    }

    async avatarUpload(req: any, res: any) {
        try {
            const {id} = req.body;
            const file = req.files.file;
            const fileExt = file.name.split('.')[file.name.split('.').length-1];
            const avaLocation = pathToUploadsDir + id + '.avatar.' + fileExt;
            try {
                await file.mv(avaLocation);
            } catch (e) {
                console.log('FILE!!! e= ',e)
            }

            try {
                const SQL = `UPDATE users SET photo='${avaLocation}' WHERE id='${id}';`
                let client = new pg.Client(process.env.DATABASE_URL);
                await client.connect();
                const dbData = await client.query(SQL);
                if (dbData.rows.length === 1) {
                    res.status(200).json({resultCode: 0});
                } else {
                    res.status(400).json({resultCode: 1});
                }
                await client.end();
            } catch (e) {
                console.log('!!!!!UsersController / avatarUpload Dbase / erorr=!!!!', e)
            }

            //res.json({resultCode: 0});

        } catch (e) {
            console.log('!!!usersController, avatarUpload, error = ', e)
        }
    }
    async getAvatar(req: any, res: any) {
        const {id} = req.body;
        try {
            const SQL = `SELECT photo FROM users WHERE id='${id}';`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);
            console.log('!!!SQL=', SQL,'DBDATA.rows =', dbData.rows, 'req.body=', req.body);
            if (dbData.rows.length === 1) {

                res.send(dbData.rows[0].photo)
                //res.status(200).json({resultCode: 0});
            } else {
                res.status(400).json({resultCode: 1});
            }
            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / avatarUpload Dbase / erorr=!!!!', e)
        }
    }
}

module.exports = new UsersController();