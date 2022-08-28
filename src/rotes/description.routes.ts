const Router = require("express");
export const router = new Router();

const descriptionController = require('./../controllers/description.controller');

//router.post('/setDescription', descriptionController.login);
router.get('/getDescription', descriptionController.getDescription);
//router.get('/getAllCategories', tasksController.getAllCategories);

module.exports = router;