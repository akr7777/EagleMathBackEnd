const Router = require("express");
export const router = new Router();

const tasksController = require('./../controllers/tasks.controller');

router.get('/getAllTasks', tasksController.getAllTasks);
//router.get('/getAllCategories', tasksController.getAllCategories);

module.exports = router;