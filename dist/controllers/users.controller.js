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
            console.log('UsersController / req=', req.query);
            const { email, password } = req.query;
            console.log('EMAIL=', email, 'PASSWORD=', password);
            try {
                const SQL = 'SELECT * FROM USERS WHERE email="";';
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const credentials = yield client.query(SQL);
                const response = {
                    id: '',
                    name: '',
                    email: '',
                    isAdmin: false
                };
                if (credentials.rows.length === 1) {
                    /*response.id = credentials[0].id;
                    response.name = credentials[0].name;
                    response.email = credentials[0].email;
                    response.isAdmin = credentials[0].isAdmin;*/
                    console.log('UsersController / credentials = ', credentials);
                }
                res.status(200).json(credentials.rows);
                yield client.end();
            }
            catch (e) {
                console.log('!!!!!erorr=!!!!', e);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('UsersController / getUser');
            res.json({ id: 0, name: 'sfd' });
        });
    }
}
module.exports = new UsersController();
