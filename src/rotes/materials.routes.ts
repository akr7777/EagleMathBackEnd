//import {Router} from "express";
const Router = require("express");
const router = new Router();
//import MaterialsController from '../controllers/materials.controller';
const materialsController = require('./../controllers/materials.controller');

router.get('/getAllMaterials', materialsController.getMaterials);
router.get('/getAllCategories', materialsController.getCategories);

module.exports = router;