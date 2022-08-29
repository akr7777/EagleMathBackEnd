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
class ContactsController {
    getContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ContactsController, getContacts, begin');
            try {
                const SQL = `SELECT * FROM contacts;`;
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
                if (dbData.rows.length === 1) {
                    const response = {
                        title: dbData.rows[0].title,
                        description: dbData.rows[0].description,
                        phone: dbData.rows[0].phone,
                        telegram: dbData.rows[0].telegram,
                        whatsapp: dbData.rows[0].whatsapp,
                        email: dbData.rows[0].email,
                        skype: dbData.rows[0].skype,
                        resultCode: 0,
                    };
                    res.status(200).json(response);
                }
                else {
                    res.status(400).json({ resultCode: 2 });
                }
                yield client.end();
            }
            catch (e) {
                console.log('!!!!!ContactsController / getContacts / erorr=!!!!', e);
            }
        });
    }
    setContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ContactsController, SetContacts, begin');
            const { title, description, phone, telegram, whatsapp, email, skype } = req.body;
            const SQL = `UPDATE contacts SET title='${title}', description='${description}', phone='${phone}', telegram='${telegram}',
                    whatsapp='${whatsapp}', email='${email}', skype='${skype}';`;
            try {
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
                //console.log('dbData.rowCount=', dbData.rowCount)
                if (dbData.rowCount) {
                    const response = {
                        title: title,
                        description: description,
                        phone: phone,
                        telegram: telegram,
                        whatsapp: whatsapp,
                        email: email,
                        skype: skype,
                        resultCode: 0,
                    };
                    //res.status(200).json(response);
                    res.status(200).json(response);
                }
                else {
                    res.status(400).json({ resultCode: 2 });
                }
                yield client.end();
            }
            catch (e) {
                console.log('!!!!!ContactsController / setContacts / erorr=!!!!', e);
            }
        });
    }
}
module.exports = new ContactsController();
