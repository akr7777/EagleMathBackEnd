//const express = require('express');
import express from 'express';
import {categoriesAPI, materialsAPI} from "./trashData/materials";

const app = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('HHHHIIIIII!');
});
app.get('/materials', function(req, res) {
    //res.send({message: 'hello world'});
    //find something though query params like /cources?title=end
    /*const cat = categoriesAPI.filter(c => c.label.indexOf(req.query.title as string) > -1);
    const mat = materialsAPI.filter(m => m.label.indexOf(req.query.title as string) > -1);
    res.json({
        categories: cat,
        materials: mat,
    });*/

    //dshdsdsudh
    //common output
    res.json({
        categories: categoriesAPI,
        materials: materialsAPI,
    });
});

app.get('/materials/:id', (req, res) => {
    const result = materialsAPI.find(m => m.id==req.params.id);
    if (result) {
        res.json({
            title: result.label,
            description: result.description,
        });
    } else {
        res.sendStatus(404);
    }

});


app.listen(port, () => {
    console.log('example port listening, port N', port);
})
