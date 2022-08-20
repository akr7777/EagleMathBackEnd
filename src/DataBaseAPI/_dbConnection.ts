const { Client, Pool } = require('pg');

const config = {
    host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
    database: 'dc9ba0jlsur7fn',
    port: 5432,
    user: 'vdbadvhizpjein',
    password: '8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0',
    connection: {
        connectionString: 'postgres://vdbadvhizpjein:8ffdc7f70733091e511e36537270d8f6c291c60cc4154823c2e0955223bf8aa0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/dc9ba0jlsur7fn',//process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    //ssl: true,
}
export const client = new Client(config);

export const pool = new Pool(config);

// /*await */client.connect()
client.connect((err:any) => {
    if (err) {
        console.error('error connecting', err.stack)
    } else {
        console.log('connected')
        client.end()
    }
})

async function getRes () {
    console.log('_bdConnection res0=')
    const res = await client.query('SELECT * FROM categories');
    /*await*/ client.end();
    console.log('_bdConnection res=', res)
    return res;
}

const res = getRes();

export default res;