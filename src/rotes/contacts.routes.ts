const Router = require("express");
export const router = new Router();

const contactsController = require('./../controllers/contacts.controller');

router.post('/getContacts', contactsController.getContacts);
router.get('/setContacts', contactsController.setContacts);

module.exports = router;