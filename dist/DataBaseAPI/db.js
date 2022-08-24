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
/*const Pool = require('pg').Pool;
const config = {
    host: '',
    database: '',
    port: 5432,
    user: '',
    password: '',
    connection: {
        connectionString: '',//process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true
        }
    }
    //ssl: true,
}
const pool = new Pool(config);*/
const { Client } = require('pg');
const config = {
    host: 'localhost',
    database: 'public',
    port: 5432,
    user: 'postgres',
    password: '111111',
    connection: {
        connectionString: '',
        ssl: {
            rejectUnauthorized: true
        }
    },
    ssl: false,
};
module.exports = {
    query1: (text) => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield new Client(config);
        console.log('Trying to connect...', client);
        yield client.connect();
        console.log('connected');
        const res = yield client.query(text);
        console.log('res', res);
    })
};
