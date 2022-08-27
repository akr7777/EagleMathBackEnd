const Router = require("express");
export const router = new Router();

const categoriesController = require('./../controllers/categories.controller');

router.get('/getAllCategories', categoriesController.getAllCategories);

module.exports = router;