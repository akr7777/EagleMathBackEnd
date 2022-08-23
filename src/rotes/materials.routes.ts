//import {router} from "../index";
const Router = require("express");
export const router = new Router();

const materialsController = require('./../controllers/materials.controller');

router.get('/getAllMaterials', materialsController.getMaterials);
//router.get('/getAllCategories', materialsController.getCategories);

module.exports = router;