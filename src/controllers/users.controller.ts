import pg from 'pg';

class UsersController {
    async login (req: any, res: any) {
        const {email, password} = req.body;

        try {
            const SQL = `SELECT * FROM USERS WHERE email='${email}' AND password='${password}';`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            if (dbData.rows.length === 1) {
                const response = {
                    id: dbData.rows[0].id,
                    name: dbData.rows[0].name,
                    email: dbData.rows[0].email,
                    isAdmin: dbData.rows[0].isadmin,
                    photo: dbData.rows[0].photo,
                    resultCode: 0,
                }
                res.status(200).json(response);
            } else {
                res.status(400).json({resultCode: 1});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!UsersController / login / erorr=!!!!', e)
        }
    }

    async getUser (req: any, res: any) {
        console.log('UsersController / getUser');
        res.json({id: 0, name: 'sfd'});
    }

    async avatarUpload (req: any, res: any) {
        console.log('userController / avatarUpload, req=', req)
        req.files.photo.mv('public/uploads/'+req.files.photo.name);
        res.end(req.files.photo.name);
        console.log(req.files.photo); // the uploaded file object
    }
}

module.exports = new UsersController();