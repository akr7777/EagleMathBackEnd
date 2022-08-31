const Router = require("express");
export const router = new Router();

const descriptionController = require('./../controllers/description.controller');

router.post('/setDescription', descriptionController.setDescription);
router.get('/getDescription', descriptionController.getDescription);
router.get('/getDescriptionPhoto', descriptionController.getDescriptionPhoto);
router.post('/setDescriptionPhoto', descriptionController.setDescriptionPhoto);

module.exports = router;