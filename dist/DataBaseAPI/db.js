"use strict";
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
};
const pg_1 = __importDefault(require("pg"));
//let pg = require("pg")
let connectionString = "pg://postgres:postgres@localhost:5432/students";
connectionString = 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn';
let client = new pg_1.default.Client(process.env.DATABASE_URL);
//client.connect();
module.exports = {
    query1: (text) => __awaiter(void 0, void 0, void 0, function* () {
        //const client = await new Client(config);
        try {
            console.log('!!!!!!!!Trying to connect.66..');
            yield client.connect();
            console.log('!!!!!!!!connected');
            const res = yield client.query(text);
            console.log('res', res);
            return res;
        }
        catch (e) {
            console.log('312432error=', e);
        }
    })
};
