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
//const db = require('./../DataBaseAPI/db');
const pg_1 = __importDefault(require("pg"));
class CategoriesController {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('materialsController/getMaterials BEFORE the query')
            //const allCategories = await db.query1('Select * from categories;');
            const text = 'Select * from categories;';
            let client = new pg_1.default.Client(process.env.DATABASE_URL);
            yield client.connect();
            const allCategories = yield client.query(text);
            //console.log('allCategories.rows=', allCategories.rows)
            res.status(200).json(allCategories.rows);
            yield client.end();
            //const allCategories = await db.query1('Select * from categories;')
            //console.log('allCategories.rows=', allCategories.rows)
            //res.status(200).json(allCategories.rows);
            //res.json(categoriesAPI);
        });
    }
}
module.exports = new CategoriesController();
