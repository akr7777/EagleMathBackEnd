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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.client = void 0;
const { Client, Pool } = require('pg');
const config = {
    host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
    database: 'dc9ba0jlsur7fn',
    port: 5432,
    user: 'vdbadvhizpjein',
    password: '8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0',
    connection: {
        connectionString: 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn',
        ssl: {
            rejectUnauthorized: false
        }
    }
    //ssl: true,
};
exports.client = new Client(config);
exports.pool = new Pool(config);
// /*await */client.connect()
exports.client.connect((err) => {
    if (err) {
        console.error('error connecting', err.stack);
    }
    else {
        console.log('connected');
        exports.client.end();
    }
});
function getRes() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('_bdConnection res0=');
        const res = yield exports.client.query('SELECT * FROM categories');
        /*await*/ exports.client.end();
        console.log('_bdConnection res=', res);
        return res;
    });
}
const res = getRes();
exports.default = res;
