//init express and router
const express = require('express');
const router = express.Router();
//init require cms controller
const cmsController = require('../controllers/cmsController.js');

//do preliminary setup for router using route
router.route('/')
     .get(cmsController.getAllContacts)
     .post(cmsController.addContact);

router.route('/:id')
     .get(cmsController.getContact)
     .patch(cmsController.updateContact)
     .delete(cmsController.deleteContact);

//route for search
router.route('/search/:keyword')
     .get(cmsController.searchContact);

//export router
module.exports = router;