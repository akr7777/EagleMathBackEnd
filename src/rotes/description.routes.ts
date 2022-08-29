const Router = require("express");
export const router = new Router();

const descriptionController = require('./../controllers/description.controller');

router.post('/setDescription', descriptionController.setDescription);
router.get('/getDescription', descriptionController.getDescription);

module.exports = router;