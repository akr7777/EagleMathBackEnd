"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const usersController = require('./../controllers/users.controller');
exports.router.post('/login', usersController.login);
exports.router.get('/getuser', usersController.getUser);
exports.router.post('/uploadAvatar', usersController.avatarUpload);
exports.router.get('/getAvatar', usersController.getAvatar);
exports.router.post('/updateEmail', usersController.updateEmail);
exports.router.post('/updatePassword', usersController.updatePassword);
module.exports = exports.router;
