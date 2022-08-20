"use strict";
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
/*client.connect((err:any) => {
    if (err) {
        console.error('error connecting', err.stack)
    } else {
        console.log('connected')
        client.end()
    }
})*/
const res = /*await*/ exports.client.query('SELECT * FROM categories');
/*await*/ exports.client.end();
exports.default = res;
