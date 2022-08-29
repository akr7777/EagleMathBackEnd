const Router = require("express");
export const router = new Router();

const contactsController = require('./../controllers/contacts.controller');

router.get('/getContacts', contactsController.getContacts);
router.post('/setContacts', contactsController.setContacts);

module.exports = router;