"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
const materials_1 = require("./trashData/materials");
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('HHHHIIIIII!');
});
app.get('/materials', function (req, res) {
    //res.send({message: 'hello world'});
    //find something though query params like /cources?title=end
    /*const cat = categoriesAPI.filter(c => c.label.indexOf(req.query.title as string) > -1);
    const mat = materialsAPI.filter(m => m.label.indexOf(req.query.title as string) > -1);
    res.json({
        categories: cat,
        materials: mat,
    });*/
    //common output
    res.json({
        categories: materials_1.categoriesAPI,
        materials: materials_1.materialsAPI,
    });
});
app.get('/materials/:id', (req, res) => {
    const result = materials_1.materialsAPI.find(m => m.id == req.params.id);
    if (result) {
        res.json({
            title: result.label,
            description: result.description,
        });
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(port, () => {
    console.log('example port listening, port N', port);
});
