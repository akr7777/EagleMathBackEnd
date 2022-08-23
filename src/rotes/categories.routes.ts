const Router = require("express");
export const router = new Router();

const categoriesController = require('./../controllers/categories.controller');

router.get('/getAllCategories', categoriesController.getAllCategories);
//router.get('/getAllCategories', tasksController.getAllCategories);
//hg

module.exports = router;