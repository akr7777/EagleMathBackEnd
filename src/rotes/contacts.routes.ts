const Router = require("express");
export const router = new Router();

const contactsController = require('./../controllers/contacts.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const i = 1;

router.get('/getContacts', authMiddleware, contactsController.getContacts);
router.post('/setContacts', contactsController.setContacts);

module.exports = router;