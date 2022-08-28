import pg from 'pg';

class UsersController {
    async login (req: any, res: any) {
        console.log('!!!UsersController / req=', req)
        console.log('!!!!!!UsersController / req.data=', req.data)
        const {email, password} = req.query;
        //console.log('EMAIL=', email, 'PASSWORD=', password)

        try {
            const SQL = `SELECT * FROM USERS WHERE email='${email}' AND password='${password}';`
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
                response.id = credentials.rows[0].id;
                response.name = credentials.rows[0].name;
                response.email = credentials.rows[0].email;
                response.isAdmin = credentials.rows[0].isadmin;
                //console.log('UsersController / credentials = ', credentials)
            }
            res.status(200).json(response);
            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / login / erorr=!!!!', e)
        }
    }

    async getUser (req: any, res: any) {
        console.log('UsersController / getUser');
        res.json({id: 0, name: 'sfd'});
    }
}

module.exports = new UsersController();