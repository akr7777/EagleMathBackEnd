import pg from 'pg';
const fs = require('fs');

const checkFileExist = (path: string) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else
            return false;
    } catch(err) {
        console.error('checkFileExist:::::', err);
        return false;
    }
}


class UsersController {
    async login(req: any, res: any) {
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

    async getUser(req: any, res: any) {
        console.log('UsersController / getUser');
        res.json({id: 0, name: 'sfd'});
    }

    async avatarUpload(req: any, res: any) {
        try {
            //console.log('userController / avatarUpload, req=', req)
            const {id} = req.body; //body={ file={} id='002'}
            const file = req.files.file;
            const fileExt = file.name.split('.')[file.name.split('.').length-1];
            console.log('avatarUpload file=', file)
            await file.mv('./public/uploads/' + id + '.avatar.' + fileExt);
            //const path = './file.txt';
            //console.log('avatarUpload: IS NEW FILE EXIST? ', checkFileExist('./public/uploads/' + id + '.' + 'avatar.' + fileExt))
            //res.end(req.files.photo.name);
            //console.log(req.files.photo); // the uploaded file object
            //console.log('userController / avatarUpload, file=', file, 'id=', id);
            res.json({resultCode: 0});

        } catch (e) {
            console.log('!!!usersController, avatarUpload, error = ', e)
        }
    }
/*
    async getAvatar(req: any, res: any) {
        const {id} = req.body;
        try {
            const fileAva = './public/uploads/'+id+'.avatar.jpeg';
        } catch (e) {
            console.log('!!!getAvatar / e=', e)
        }
    }*/
}

module.exports = new UsersController();