import pg from 'pg';

class UsersController {
    async login (req: any, res: any) {
        console.log('UsersController / req=', req)
        const email = req;
        const password = req;

        const SQL = 'SELECT * FROM USERS WHERE email="";'
        let client = new pg.Client(process.env.DATABASE_URL);
        await client.connect();
        const credentials = await client.query(SQL);

        const response = {
            id: '',
            name: '',
            email: '',
            isAdmin: false
        }
        if (credentials.rows.length === 1) {
            /*response.id = credentials[0].id;
            response.name = credentials[0].name;
            response.email = credentials[0].email;
            response.isAdmin = credentials[0].isAdmin;*/
            console.log('UsersController / credentials = ', credentials)
        }
        res.status(200).json(credentials.rows);
        await client.end();
    }

    async getUser (req: any, res: any) {
        console.log('UsersController / getUser');
        res.json({id: 0, name: 'sfd'});
    }
}

module.exports = new UsersController();