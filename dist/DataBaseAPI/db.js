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
    host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
    database: 'dc9ba0jlsur7fn',
    port: 5432,
    user: 'vdbadvhizpjein',
    password: '8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0',
    connection: {
        connectionString: 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn',//process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true
        }
    }
    //ssl: true,
}
const pool = new Pool(config);*/
const { Client } = require('pg');
const config = {
    host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
    database: 'dc9ba0jlsur7fn',
    port: 5432,
    user: 'vdbadvhizpjein',
    password: '8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0',
    connection: {
        connectionString: 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn',
        ssl: {
            rejectUnauthorized: true
        }
    },
    ssl: false,
};
module.exports = {
    query1: (text) => __awaiter(void 0, void 0, void 0, function* () {
        const client = new Client(config);
        console.log('Trying to connect...');
        yield client.connect();
        console.log('connected');
        const res = yield client.query(text);
        console.log('res', res);
    })
};
