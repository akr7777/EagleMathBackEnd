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
            console.log('userController / avatarUpload, req.files=', req.files);
            req.files.photo.mv('public/uploads/' + req.files.photo.name);
            res.end(req.files.photo.name);
            console.log(req.files.photo); // the uploaded file object
        });
    }
}
module.exports = new UsersController();
