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
/*
const { Client } = require('pg');

const config = {
    host: 'localhost',
    database: 'public',
    port: 5432,
    user: 'postgres',
    password: '111111',
    connection: {
        connectionString: '',//process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true
        }
    },
    ssl: false,
}
*/

const config = {
    host: '195.133.196.81',
    database: 'public',
    port: 5432,
    user: 'postgres',
    password: '111111',
    /*connection: {
        //connectionString: '',//process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    },
    ssl: false,*/
}
import pg from 'pg';
//let pg = require("pg")
let connectionString = "";
let client = new pg.Client(process.env.DATABASE_URL);
//client.connect();

module.exports = {
    query1: async (text: string) => {
        //const client = await new Client(config);
        try {
            //console.log('!!!!!!!!Trying to connect...');
            await client.connect();
            //console.log('!!!!!!!!connected');
            const res = await client.query(text);
            client.end();
            return res;
        }
        catch (e) {
            console.log('312432error=', e)
        }
    }
}