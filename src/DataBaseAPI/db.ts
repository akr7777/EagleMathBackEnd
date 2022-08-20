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
        connectionString: 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn',//process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true
        }
    },
    ssl: false,
}


module.exports = {
    query1: async (text: string) => {
        const client = new Client(config);
        console.log('Trying to connect...');
        await client.connect()
        console.log('connected');
        const res = await client.query(text);
        console.log('res', res)
    }
}