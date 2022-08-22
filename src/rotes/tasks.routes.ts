const Router = require("express");
const router = new Router();
//import {router} from "../index";

const tasksController = require('./../controllers/tasks.controller');

router.get('/getAllTasks', tasksController.getAllTasks);
router.get('/getAllCategories', tasksController.getAllCategories);

module.exports = router;