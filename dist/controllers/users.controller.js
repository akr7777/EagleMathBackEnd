"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const fs = require('fs');
const path = require('path');
const pathToUploadsDir = './src/public/uploads/';
const pathToFolder = '/app';
const checkFileExist = (path) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        }
        else
            return false;
    }
    catch (err) {
        console.error('checkFileExist:::::', err);
        return false;
    }
};
const checkDirExist = (path) => {
    fs.stat(path, function (err) {
        if (!err) {
            console.log('Директория есть', path);
        }
        else if (err.code === 'ENOENT') {
            console.log('директории нет', path);
        }
    });
};
class UsersController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const SQL = `SELECT * FROM USERS WHERE email='${email}' AND password='${password}';`;
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
                if (dbData.rows.length === 1) {
                    const response = {
                        id: dbData.rows[0].id,
                        name: dbData.rows[0].name,
                        email: dbData.rows[0].email,
                        isAdmin: dbData.rows[0].isadmin,
                        photo: dbData.rows[0].photo,
                        resultCode: 0,
                    };
                    res.status(200).json(response);
                }
                else {
                    //res.status(400).json({resultCode: 1});
                }
                yield client.end();
            }
            catch (e) {
                console.log('!!!!!UsersController / login / erorr=!!!!', e);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('UsersController / getUser');
            res.json({ id: 0, name: 'sfd' });
        });
    }
    avatarUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const file = req.files.file;
                const fileExt = file.name.split('.')[file.name.split('.').length - 1];
                const avaLocation = pathToUploadsDir + id + '.avatar.' + fileExt;
                try {
                    yield file.mv(avaLocation);
                }
                catch (e) {
                    console.log('FILE!!! e= ', e);
                }
                try {
                    const SQL = `UPDATE users SET photo='${avaLocation}' WHERE id='${id}';`;
                    let client = new pg_1.default.Client(process.env.DATABASE_URL);
                    yield client.connect();
                    const dbData = yield client.query(SQL);
                    if (dbData.rows.length === 1) {
                        res.status(200).json({ resultCode: 0 });
                    }
                    else {
                        res.status(400).json({ resultCode: 1 });
                    }
                    yield client.end();
                }
                catch (e) {
                    console.log('!!!!!UsersController / avatarUpload Dbase / erorr=!!!!', e);
                }
                //res.json({resultCode: 0});
            }
            catch (e) {
                console.log('!!!usersController, avatarUpload, error = ', e);
            }
        });
    }
    getAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            try {
                const SQL = `SELECT photo FROM users WHERE id='${id}';`;
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
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
                }
                else {
                    const standartPhotoAvatar = path.join(pathToFolder, pathToUploadsDir);
                    console.log('USERS / getAvatar / standartPhotoAvatar=', standartPhotoAvatar);
                    res.status(200).sendFile(standartPhotoAvatar);
                    //res.status(400).json({resultCode: 1});
                }
                yield client.end();
            }
            catch (e) {
                console.log('!!!!!UsersController / avatarUpload Dbase / erorr=!!!!', e);
            }
        });
    }
    updateEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, newEmail } = req.body;
                try {
                    const SQL = `UPDATE users SET email='${newEmail}' WHERE id='${id}';`;
                    let client = new pg_1.default.Client(process.env.DATABASE_URL);
                    yield client.connect();
                    const dbData = yield client.query(SQL);
                    if (dbData.rowCount === 1) {
                        //console.log('{newEmail: newEmail, resultCode: 0}===', {newEmail: newEmail, resultCode: 0})
                        res.status(200).json({ newEmail: newEmail, resultCode: 0 });
                    }
                    else {
                        res.status(459).json({ resultCode: 1 });
                    }
                    yield client.end();
                }
                catch (e) {
                    console.log('!!!!!UsersController / updateEmail / erorr=!!!!', e);
                }
                //res.json({resultCode: 0});
            }
            catch (e) {
                console.log('!!!usersController, updateEmail, error = ', e);
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, oldPass, newPass } = req.body;
                try {
                    const oldPassSQL = `SELECT password FROM users WHERE id='${id}';`;
                    const updatePassSQL = `UPDATE users SET password='${newPass}' WHERE id='${id}';`;
                    let client = new pg_1.default.Client(process.env.DATABASE_URL);
                    yield client.connect();
                    const oldPassFromDB = yield client.query(oldPassSQL);
                    console.log('oldPassFromDB.rows[0]=', oldPassFromDB.rows[0], 'oldPassFromDB.rows[0].password=', oldPassFromDB.rows[0].password);
                    console.log('oldPassFromDB.rows[0].password !== oldPass::::', oldPassFromDB.rows[0].password !== oldPass);
                    if (oldPassFromDB.rows[0].password !== oldPass)
                        res.status(200).json({ resultCode: 10 });
                    else {
                        const dbData = yield client.query(updatePassSQL);
                        if (dbData.rowCount === 1) {
                            //console.log('{newEmail: newEmail, resultCode: 0}===', {newEmail: newEmail, resultCode: 0})
                            res.status(200).json({ resultCode: 0 });
                        }
                        else {
                            res.status(459).json({ resultCode: 1 });
                        }
                    }
                    yield client.end();
                }
                catch (e) {
                    console.log('!!!!!UsersController / updateEmail / erorr=!!!!', e);
                }
                //res.json({resultCode: 0});
            }
            catch (e) {
                console.log('!!!usersController, updateEmail, error = ', e);
            }
        });
    }
}
module.exports = new UsersController();
