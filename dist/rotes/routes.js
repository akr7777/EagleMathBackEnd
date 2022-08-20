"use strict";
//import {Router} from "express";
const Router = require("express");
const router = new Router();
//import MaterialsController from '../controllers/materials.controller';
const materialsController = require('./../controllers/materials.controller');
router.get('/materials', materialsController.getMaterials);
module.exports = router;
