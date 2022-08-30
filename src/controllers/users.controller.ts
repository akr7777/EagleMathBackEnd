import pg from 'pg';
const fs = require('fs');
const path = require('path');

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

const checkDirExist = (path: string) => {
    fs.stat(path, function(err:any) {
        if (!err) {
            console.log('Директория есть', path);
        }
        else if (err.code === 'ENOENT') {
            console.log('директории нет', path);
        }
    });
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
            console.log('avatarUpload file=', file);
            try {
                console.log('111111:', fs.readdirSync('./'));
                console.log('22222:', fs.readdirSync('./src'));
                console.log('33333:', fs.readdirSync('./src/public'));
                console.log('44444:', fs.readdirSync('./src/public/uploads'));
                //console.log('222222:', fs.readdirSync(''));
                /*checkDirExist('public');
                checkDirExist('./public');
                checkDirExist('public/uploads');
                checkDirExist('./public/uploads');*/
                await file.mv('./src/public/uploads/' + id + '.avatar.' + fileExt);
            } catch (e) {
                console.log('FILE!!! e= ',e)
            }

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