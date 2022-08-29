"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router = require("express");
exports.router = new Router();
const contactsController = require('./../controllers/contacts.controller');
exports.router.get('/getContacts', contactsController.getContacts);
exports.router.post('/setContacts', contactsController.setContacts);
module.exports = exports.router;
