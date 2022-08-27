const Router = require("express");
export const router = new Router();

const usersController = require('./../controllers/users.controller');

router.post('/login', usersController.login);
//router.get('/getAllCategories', tasksController.getAllCategories);

module.exports = router;