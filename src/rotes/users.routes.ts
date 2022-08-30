const Router = require("express");
export const router = new Router();

const usersController = require('./../controllers/users.controller');

router.post('/login', usersController.login);
router.get('/getuser', usersController.getUser);
router.post('/uploadAvatar', usersController.avatarUpload);
router.get('/getAvatar', usersController.getAvatar)

module.exports = router;