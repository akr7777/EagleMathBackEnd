import pg from 'pg';

const fs = require('fs');
const path = require('path');
const pathToUploadsDir = './src/public/uploads/';
const pathToFolder = '/app';
const pathToStandartAva = path.join(pathToFolder, pathToUploadsDir, 'abstractAvatar.jpeg');
import {v1} from 'uuid';
import {createAccessToken, createRefreshToken} from "../utils/generateTokens";

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const checkFileExist = (path: string) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else
            return false;
    } catch (err) {
        console.error('checkFileExist:::::', err);
        return false;
    }
}
const checkDirExist = (path: string) => {
    fs.stat(path, function (err: any) {
        if (!err) {
            console.log('Директория есть', path);
        } else if (err.code === 'ENOENT') {
            console.log('директории нет', path);
        }
    });
}
const fileCopy = async (oldFile: string, newFile: string) => {
    await fs.copyFile(oldFile, newFile, (err: any) => {
        if (err) throw err; // не удалось скопировать файл
        console.log('Файл успешно скопирован');
    });
}
const createLoginCookie = (res:any, refreshToken:any) => {
    res.cookie('token', refreshToken, {
        httpOnly: true,
        //secure: getEnv('NODE_ENV') === PRODUCTION ? true : false,
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    })
}

//const accessTokenSecret = process.env.accessTokenSecret;
//const refreshTokenSecret = process.env.refreshTokenSecret;

type UserTokenDataType = {
    id: string,
    name: string,
    email: string,
    isAdmin: boolean,
}
let refreshTokens: Array<UserTokenDataType> = [];

class UsersController {
    async login(req: any, res: any) {
        console.log('req=', req)
        // read username and password from request body
        const {email, password} = req.body;

        //Проверяем соответсвуют ли данные логина данным пользователя (email и password)
        const SQL = `SELECT id,name,email,isadmin FROM USERS WHERE email='${email}' AND password='${password}';`
        let client = new pg.Client(process.env.DATABASE_URL);
        await client.connect();
        const dbData = await client.query(SQL);
        if (dbData.rows.length === 1) {
            // generate an access token
            const userInfo = {
                id: dbData.rows[0].id,
                name: dbData.rows[0].name,
                email: dbData.rows[0].email,
                isAdmin: dbData.rows[0].isadmin,
            }
            if (userInfo) {
                const accessToken = createAccessToken(userInfo.id);
                const refreshToken = createRefreshToken(userInfo.id);

                //refreshTokens.push(refreshToken);
                createLoginCookie(res, refreshToken);

                res.json({
                    accessToken,
                    refreshToken,
                    userInfo,
                    resultCode: 0,
                });
            }
            else {
                res.send({resultCode: 10}); //Если пользователя нет в БД, отправляем этот resultCode
            }
        }

        await client.end();
    }

    async getAccessToken (req:any, res: any) {
        try {
            const rfToken = req.cookies.token
            if (!rfToken) {
                res.status(400)
                throw new Error('Пожалуйста, войдите в систему!')
            }

            const result = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET)
            if (!result) {
                res.status(400)
                throw new Error('Неверный токен или закончился.')
            }

            //const user = await User.findById(result.id)
            try {
                const SQL = `SELECT * FROM USERS WHERE id='${result.id}';`
                let client = new pg.Client(process.env.DATABASE_URL);
                await client.connect();
                const dbData = await client.query(SQL);

                //console.log('UsersController / login / dbData=', dbData)

                if (dbData.rows.length === 1) {
                    const accessToken = createAccessToken(dbData.rows[0].id)

                    res.json({
                        userInfo: {
                            id: dbData.rows[0].id,
                            email: dbData.rows[0].email,
                            name: dbData.rows[0].name,
                            isAdmin: dbData.rows[0].isadmin,
                        },
                        accessToken,
                    })
                } else {
                    res.status(400)
                    throw new Error('Пользователь не найден.')
                }
            } catch (e) {
                console.log('error!!!!!!!!!=', e)
            }

        } catch (error: any) {
            res.status(500)
            throw new Error(error.message)
        }
    }

    async logoutUser (req: any, res: any)  {
        res
            .cookie('token', '', {
                httpOnly: true,
                path: '/',
                expires: new Date(0),
            })
            .send()
    }
    //обработчик запроса, который генерирует новые токены на основе обновленных токенов:
    /*async token(req: any, res: any) {
        const {token} = req.body;

        if (!token) {
            return res.sendStatus(401);
        }

        if (!refreshTokens.includes(token)) {
            return res.sendStatus(403);
        }

        jwt.verify(token, refreshTokenSecret, (err: any, user: UserTokenDataType) => {
            if (err) {
                return res.sendStatus(403);
            }

            const userToken = {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
            const accessToken = jwt.sign(userToken, accessTokenSecret, {expiresIn: '20m'});

            res.json({
                accessToken
            });
        });
    }*/

    //Если токен refresh будет украден у пользователя, кто-то может использовать его для генерации любого количества новых токенов.
    // Чтобы избежать этого, давайте реализуем простую функцию выхода из системы:
    /*async logout(req: any, res: any) {
        const {token} = req.body;
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.send("Logout successful");
    }
*/
    /*async login(req: any, res: any) {
        const {email, password} = req.body;

        try {
            const SQL = `SELECT * FROM USERS WHERE email='${email}' AND password='${password}';`
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
    }*/

    async singUpNewUser(req: any, res: any) {
        const {name, email, password} = req.body;

        try {
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();

            //Проверка сущестрования user с указанным email
            const checkUserSQL = `SELECT name FROM users WHERE email='${email}';`
            const dbCheckUserSQL = await client.query(checkUserSQL);

            if (dbCheckUserSQL.rowCount === 1) {
                res.json({resultCode: 10}); //Пользователь уже существует
            } else {
                const newUserId = v1();

                //КОпируем стандартный аватар
                const avaLocation = pathToUploadsDir + newUserId + '.avatar.jpeg';
                console.log('Копируем стандартный аватар...')
                if (checkFileExist(pathToStandartAva)) {
                    await fileCopy(pathToStandartAva, avaLocation);
                }
                //console.log('New AVA exists? ', checkFileExist(avaLocation));
                if (checkFileExist(avaLocation))
                    console.log('Стандартный  аватар успешно скопирован.')

                const SQL = `INSERT INTO users (id, name, email, isAdmin, photo, password) 
                        VALUES ('${newUserId}', '${name}', '${email}', false, '${avaLocation}', '${password}');`

                const dbData = await client.query(SQL);

                if (dbData.rowCount === 1) {
                    res.status(200).json({resultCode: 0});
                } else {
                    res.json({resultCode: 1});
                }
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
            const fileExt = file.name.split('.')[file.name.split('.').length - 1];
            const avaLocation = pathToUploadsDir + id + '.avatar.' + fileExt;
            try {
                await file.mv(avaLocation);
            } catch (e) {
                console.log('FILE!!! e= ', e)
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