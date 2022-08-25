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
let connectionString = "pg://postgres:postgres@localhost:5432/students";
connectionString = 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn';
let client = new pg.Client(process.env.DATABASE_URL);
//client.connect();

module.exports = {
    query1: async (text: string) => {
        //const client = await new Client(config);
        try {
            console.log('!!!!!!!!Trying to connect.66..');
            await client.connect();
            console.log('!!!!!!!!connected');
            const res = await client.query(text);
            console.log('res', res);
            return res;
        }
        catch (e) {
            console.log('312432error=', e)
        }
    }
}