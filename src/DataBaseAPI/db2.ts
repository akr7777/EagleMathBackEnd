import {Client} from "pg";

let pg = require("pg")
let connectionString = "pg://postgres:postgres@localhost:5432/students";
let client = new pg.Client(connectionString);
client.connect();

module.exports = {
    query1: async (text: string) => {
        //const client = await new Client(config);
        console.log('Trying to connect...', client);
        await client.connect();
        console.log('connected');
        const res = await client.query(text);
        console.log('res', res)
    }
}