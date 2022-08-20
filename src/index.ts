//const express = require('express');
import express from 'express';
import res from "./DataBaseAPI/_dbConnection";
//import {categoriesAPI, materialsAPI} from "./trashData/materials";
//import res, {client, pool} from "./DataBaseAPI/_dbConnection";
const materialsRouter = require('./rotes/materials.routes');

const app = express();
const port = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

app.use('/materials', materialsRouter);


/*app.use(cors({
    origin: 'http://localhost'
}));*/
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

//console.log('INDEX res=', res);
app.get('/', cors(), (req, res, next) => {
    res.send('This is an empty END POINT /');
    //sfdfsfd
});

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})
/*

/!*app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Allow,Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
});*!/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest");
    next();
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', cors(), (req, res, next) => {
    res.send('HHHHIIIIII!');
});
app.get('/materials', function(req, res,next) {
    //res.send({message: 'hello world'});
    //find something though query params like /cources?title=end
    /!*const cat = categoriesAPI.filter(c => c.label.indexOf(req.query.title as string) > -1);
    const mat = materialsAPI.filter(m => m.label.indexOf(req.query.title as string) > -1);
    res.json({
        categories: cat,
        materials: mat,
    });*!/

    //client.end();
    /!*client.connect();
    client.query('Select * from categories;', (err:any, res:any) => {
        if (err) {
            console.log('!Error>>>!', err.stack, '!<<<Error!')
        } else {
            console.log(res.rows[0])
        }
    })
    client.end();*!/


    /!*pool.connect(function (err:any, client:any, done:any) {
        console.log('pool')
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM categoties', function (err:any, result:any) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        })
    })*!/

    //common output
    res.json(JSON.stringify({
        categories: categoriesAPI,
        materials: materialsAPI,
    }));
});

app.get('/materials/:id', (req, res,next) => {

    const result = materialsAPI.find(m => m.id==req.params.id);
    if (result) {
        res.json({
            title: result.label,
            description: result.content,
        });
    } else {
        res.sendStatus(404);
    }

});


app.listen(port, () => {
    console.log('111')
    //pool.
    //client.end();
    /!*client.connect((err:any) => {
        if (err) {
            console.error('error connecting', err.stack)
        } else {
            console.log('connected')
            client.end()
        }
    })*!/
    console.log('example port listening, port N', port);
})

//console.log('res=', res);
*/
