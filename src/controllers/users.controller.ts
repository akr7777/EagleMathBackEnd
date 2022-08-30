import pg from 'pg';
const fs = require('fs');
const path = require('path');
const pathToUploadsDir = './src/public/uploads/';

const checkFileExist = (path: string) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else
            return false;
    } catch(err) {
        console.error('checkFileExist:::::', err);
        return false;
    }
}
const checkDirExist = (path: string) => {
    fs.stat(path, function(err:any) {
        if (!err) {
            console.log('Директория есть', path);
        }
        else if (err.code === 'ENOENT') {
            console.log('директории нет', path);
        }
    });
}


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
        const {id} = req.query;
        try {
            const SQL = `SELECT photo FROM users WHERE id='${id}';`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);
            console.log('!!!SQL=', SQL,'DBDATA.rows =', dbData.rows, 'req.query=', req.query);
            if (dbData.rows.length === 1) {
                const photo = dbData.rows[0].photo;
                console.log("!!!!PHOTO=", photo);
                const fullDir = path.join(__dirname, photo);
                console.log('!!!!!FULL DIR=', fullDir);
                console.log('1111111', checkDirExist('/app'));
                console.log('2222', checkDirExist('/app/dist'));//dist/controllers/src/public/uploads/002.avatar.jpeg
                console.log('333', checkDirExist('/app/dist/controllers'));//src/public/uploads/002.avatar.jpeg
                console.log('444', checkDirExist('/app/dist/controllers/src'));//src/public/uploads/002.avatar.jpeg
                //res.status(200).sendFile(fullDir);
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