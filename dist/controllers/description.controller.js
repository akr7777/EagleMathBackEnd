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
const path_1 = __importDefault(require("path"));
const pathToUploadsDir = './src/public/uploads/';
const pathToFolder = '/app';
class DescriptionController {
    getDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log('DescriptionController / getDescription')
                const SQL = `SELECT * FROM description;`;
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
                if (dbData.rows.length === 1) {
                    const response = {
                        title: dbData.rows[0].title,
                        photo: dbData.rows[0].photo,
                        description: dbData.rows[0].description,
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
                console.log('!!!!!DescriptionController / getDescription / erorr=!!!!', e);
            }
        });
    }
    setDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, photo, description } = req.body;
            const SQL = `UPDATE description SET title='${title}', photo='${photo}', description='${description}';`;
            try {
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
                //console.log('setDescription / dbData.rowCount=', dbData.rowCount)
                if (dbData.rowCount) {
                    const response = {
                        title: title,
                        photo: photo,
                        description: description,
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
                console.log('!!!!!DescriptionController / getDescription / erorr=!!!!', e);
            }
        });
    }
    getDescriptionPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = `SELECT photo FROM description;`;
                let client = new pg_1.default.Client(process.env.DATABASE_URL);
                yield client.connect();
                const dbData = yield client.query(SQL);
                if (dbData.rows.length === 1) {
                    const photo = dbData.rows[0].photo;
                    const fullDir = path_1.default.join(pathToFolder, photo);
                    res.status(200).sendFile(fullDir);
                }
                else {
                    const standartPhoto = path_1.default.join(pathToFolder, pathToUploadsDir);
                    res.status(200).sendFile(standartPhoto);
                }
                yield client.end();
            }
            catch (e) {
                console.log('!!!!!Descr Controller / getDescriptionPhoto Dbase / erorr=!!!!', e);
            }
        });
    }
    setDescriptionPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.files.file;
                const fileExt = file.name.split('.')[file.name.split('.').length - 1];
                const descriptionPhotoLocation = path_1.default.join(pathToUploadsDir, 'descriptionPhoto.' + fileExt);
                //console.log('descrController / setDescriptionPhoto/ descriptionPhotoLocation=', descriptionPhotoLocation)
                try {
                    yield file.mv(descriptionPhotoLocation);
                }
                catch (e) {
                    console.log('FILE!!! e= ', e);
                }
                try {
                    const SQL = `UPDATE description SET photo='${descriptionPhotoLocation}';`;
                    //console.log('descrController / setDescriptionPhoto/ SQL=', SQL)
                    let client = new pg_1.default.Client(process.env.DATABASE_URL);
                    yield client.connect();
                    const dbData = yield client.query(SQL);
                    //console.log('descrController / setDescriptionPhoto/ dbData=', dbData)
                    if (dbData.rows.length === 1) {
                        res.status(200).json({ resultCode: 0 });
                    }
                    else {
                        res.status(400).json({ resultCode: 1 });
                    }
                    yield client.end();
                }
                catch (e) {
                    console.log('!!!!!descriptionController / setDescriptionPhoto / erorr=!!!!', e);
                }
            }
            catch (e) {
                console.log('!!!descrCOntroller, setDescriptionPhoto, FInal error = ', e);
            }
        });
    }
}
module.exports = new DescriptionController();
