const Router = require("express");
export const router = new Router();

const materialsController = require('./../controllers/materials.controller');

router.get('/getAllMaterials', materialsController.getAllMaterials);

module.exports = router;