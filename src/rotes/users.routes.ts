const Router = require("express");
export const router = new Router();

const usersController = require('./../controllers/users.controller');

router.post('/login', usersController.login);
router.post('/token', usersController.token);
router.post('/logout', usersController.logout);

router.get('/getuser', usersController.getUser);
router.post('/uploadAvatar', usersController.avatarUpload);
router.get('/getAvatar', usersController.getAvatar);
router.post('/updateEmail', usersController.updateEmail);
router.post('/updatePassword', usersController.updatePassword);
router.post('/singUpNewUser', usersController.singUpNewUser);

module.exports = router;