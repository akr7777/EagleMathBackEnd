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
                    res.status(400).json({ resultCode: 1 });
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
                //console.log('userController / avatarUpload, req=', req)
                const { id } = req.body; //body={ file={} id='002'}
                const file = req.files.file;
                const fileExt = file.name.split('.')[file.name.split('.').length - 1];
                console.log('avatarUpload file=', file);
                try {
                    console.log('111111:', fs.readdirSync('./'));
                    console.log('22222:', fs.readdirSync('./src'));
                    console.log('33333:', fs.readdirSync('./src/public'));
                    console.log('44444:', fs.readdirSync('./src/public/uploads'));
                    //console.log('222222:', fs.readdirSync(''));
                    /*checkDirExist('public');
                    checkDirExist('./public');
                    checkDirExist('public/uploads');
                    checkDirExist('./public/uploads');*/
                    yield file.mv('./src/public/uploads/' + id + '.avatar.' + fileExt);
                }
                catch (e) {
                    console.log('FILE!!! e= ', e);
                }
                //const path = './file.txt';
                //console.log('avatarUpload: IS NEW FILE EXIST? ', checkFileExist('./public/uploads/' + id + '.' + 'avatar.' + fileExt))
                //res.end(req.files.photo.name);
                //console.log(req.files.photo); // the uploaded file object
                //console.log('userController / avatarUpload, file=', file, 'id=', id);
                res.json({ resultCode: 0 });
            }
            catch (e) {
                console.log('!!!usersController, avatarUpload, error = ', e);
            }
        });
    }
}
module.exports = new UsersController();
