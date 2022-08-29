import pg from 'pg';

class ContactsController {
    async getContacts(req: any, res: any) {
        console.log('ContactsController, getContacts, begin')
        try {
            const SQL = `SELECT * FROM contacts;`
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            if (dbData.rows.length === 1) {
                const response = {
                    title: dbData.rows[0].title,
                    description: dbData.rows[0].description,
                    phone: dbData.rows[0].phone,
                    telegram: dbData.rows[0].telegram,
                    whatsapp: dbData.rows[0].whatsapp,
                    email: dbData.rows[0].email,
                    skype: dbData.rows[0].skype,
                    resultCode: 0,
                }
                res.status(200).json(response);
            } else {
                res.status(400).json({resultCode: 2});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!ContactsController / getContacts / erorr=!!!!', e)

        }
    }

    async setContacts(req: any, res: any) {
        console.log('ContactsController, SetContacts, begin')

        const {title, description, phone, telegram, whatsapp, email, skype} = req.body;
        const SQL = `UPDATE contacts SET title='${title}', description='${description}', phone='${phone}', telegram='${telegram}',
                    whatsapp='${whatsapp}', email='${email}', skype='${skype}';`

        try {
            let client = new pg.Client(process.env.DATABASE_URL);
            await client.connect();
            const dbData = await client.query(SQL);

            //console.log('dbData.rowCount=', dbData.rowCount)
            if (dbData.rowCount) {
                const response = {
                    title: title,
                    description: description,
                    phone: phone,
                    telegram: telegram,
                    whatsapp: whatsapp,
                    email: email,
                    skype: skype,
                    resultCode: 0,
                }
                //res.status(200).json(response);
                res.status(200).json(response);
            } else {
                res.status(400).json({resultCode: 2});
            }

            await client.end();
        } catch (e) {
            console.log('!!!!!ContactsController / setContacts / erorr=!!!!', e)

        }
    }

}

module.exports = new ContactsController();