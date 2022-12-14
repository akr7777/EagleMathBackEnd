"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const usersController = require('./../controllers/users.controller');
exports.router.post('/login', usersController.login);
//router.post('/token', usersController.token);
//router.post('/logout', usersController.logout);
exports.router.get('/getuser', usersController.getUser);
exports.router.post('/uploadAvatar', usersController.avatarUpload);
exports.router.get('/getAvatar', usersController.getAvatar);
exports.router.post('/updateEmail', usersController.updateEmail);
exports.router.post('/updatePassword', usersController.updatePassword);
exports.router.post('/singUpNewUser', usersController.singUpNewUser);
module.exports = exports.router;
