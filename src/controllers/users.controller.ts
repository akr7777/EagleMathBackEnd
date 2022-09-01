import pg from 'pg';
const fs = require('fs');
const path = require('path');
const pathToUploadsDir = './src/public/uploads/';
const pathToFolder = '/app';
import {v1} from 'uuid';

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
            //console.log('UsersController / login / SQL=', SQL)
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            //console.log('UsersController / login / dbData=', dbData)
            if (dbData.rows.length === 1) {
                const response = {
                    id: dbData.rows[0].id,
                    name: dbData.rows[0].name,
                    email: dbData.rows[0].email,
                    isAdmin: dbData.rows[0].isadmin,
                    //photo: dbData.rows[0].photo,
                    resultCode: 0,
                }
                res.status(200).json(response);
            } else {
                //console.log('UsersController / login / {resultCode: 10}')
                res.json({resultCode: 10});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / login / erorr=!!!!', e);
            res.json({resultCode: 1});
        }
    }

    async singUpNewUser(req: any, res: any) {
        const {name, email, password} = req.body;

        try {
            const newUserId = v1();
            const SQL = `INSERT INTO users (id, name, email, isAdmin, photo, password) 
                        VALUES ('${newUserId}', '${name}', '${email}', false, '', '${password}');`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            if (dbData.rowCount === 1) {
                res.status(200).json({resultCode: 0});
            } else {
                res.json({resultCode: 1});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / login / erorr=!!!!', e);
            res.json({resultCode: 1});
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
            //console.log('!!!SQL=', SQL,'DBDATA.rows =', dbData.rows, 'req.query=', req.query);
            if (dbData.rows.length === 1) {
                const photo = dbData.rows[0].photo;
                //console.log("!!!!PHOTO=", photo);
                const fullDir = path.join(pathToFolder, photo);
                /*console.log('!!!!!FULL DIR=', fullDir);
                checkDirExist('/app')
                checkDirExist('/app/dist')//dist/controllers/src/public/uploads/002.avatar.jpeg
                checkDirExist('/app/dist/controllers')
                checkDirExist('/app/dist/controllers/src')
                console.log('/app/dist/ СОДЕРЖТ:', fs.readdirSync('/app/dist/'));
                console.log('/app/ СОДЕРЖТ:', fs.readdirSync('/app/'));
                console.log(pathToFolder+'/src/public/uploads', ' СОДЕРЖТ:', fs.readdirSync(pathToFolder+'/src/public/uploads'));
                console.log('fullDir:', checkFileExist(fullDir));*/
                res.status(200).sendFile(fullDir);
            } else {
                const standartPhotoAvatar = path.join(pathToFolder, pathToUploadsDir);
                res.status(200).sendFile(standartPhotoAvatar);
            }
            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / avatarUpload Dbase / erorr=!!!!', e)
        }
    }

    async updateEmail(req: any, res: any) {
        try {
            const {id, newEmail} = req.body;
            try {
                const SQL = `UPDATE users SET email='${newEmail}' WHERE id='${id}';`
                let client = new pg.Client(process.env.DATABASE_URL);
                await client.connect();
                const dbData = await client.query(SQL);
                if (dbData.rowCount === 1) {
                    //console.log('{newEmail: newEmail, resultCode: 0}===', {newEmail: newEmail, resultCode: 0})
                    res.status(200).json({newEmail: newEmail, resultCode: 0});
                } else {
                    res.status(459).json({resultCode: 1});
                }
                await client.end();
            } catch (e) {
                console.log('!!!!!UsersController / updateEmail / erorr=!!!!', e)
            }
            //res.json({resultCode: 0});
        } catch (e) {
            console.log('!!!usersController, updateEmail, error = ', e)
        }
    }

    async updatePassword(req: any, res: any) {
        try {
            const {id, oldPass, newPass} = req.body;
            //console.log('id, oldPass, newPass =', id, oldPass, newPass)
            try {
                const oldPassSQL = `SELECT password FROM users WHERE id='${id}';`
                const updatePassSQL = `UPDATE users SET password='${newPass}' WHERE id='${id}';`
                let client = new pg.Client(process.env.DATABASE_URL);
                await client.connect();
                const oldPassFromDB = await client.query(oldPassSQL);

                if (oldPassFromDB.rows[0].password !== oldPass)
                    res.status(200).json({resultCode: 10}); //старый пароль введен НЕверно
                else {
                    const dbData = await client.query(updatePassSQL);
                    if (dbData.rowCount === 1) {
                        res.status(200).json({resultCode: 0});
                    } else {
                        res.status(459).json({resultCode: 1});
                    }
                }
                await client.end();
            } catch (e) {
                console.log('!!!!!UsersController / updateEmail / erorr=!!!!', e)
            }
            //res.json({resultCode: 0});
        } catch (e) {
            console.log('!!!usersController, updateEmail, error = ', e)
        }
    }
}

module.exports = new UsersController();