//init cms model
const cmsModel = require('../models/cmsModel.js');
const asyncHandler = require('express-async-handler');
//@desc get all contacts
//@route GET /cms
//@access Private
exports.getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await cmsModel.find();
    
    //create condition if no contacts
    if (!contacts) {
        res.status(404);
        throw new Error('No contacts found');
    }

    res.json(contacts);
});

//@des add a contact
//@route POST /cms
exports.addContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    
    const { name, email, phone, address } = req.body;
    const contact = await cmsModel.create({
        name,
        address,
        email,
        phone,
    });

    res.json(contact);
});

//@desc update a contact
//@route PATCH /cms/:id
//@access Private
exports.updateContact = asyncHandler(async (req, res) => {
    const { name, email, phone, address } = req.body;
    const contact = await cmsModel.findByIdAndUpdate(req.params.id, {
        name,
        address,
        email,
        phone,
    }, { new: true });
    res.json(contact);
});

//@desc delete a contact
//@route DELETE /cms/:id
//@access Private
exports.deleteContact = asyncHandler(async (req, res) => {
    const contact = await cmsModel.findByIdAndDelete(req.params.id);
    res.json(contact);
});

//@desc get a contact
//@route GET /cms/:id
//@access Private
exports.getContact = asyncHandler(async (req, res) => {
    const contact = await cmsModel.findById(req.params.id);
    res.json(contact);
});

//@desc search a contact
//@route GET /cms/search/:keyword
//@access Private
exports.searchContact = asyncHandler(async (req, res) => {

    //query all contacts with name, email, address, phone

    const contacts = await cmsModel.find({
        $or: [
            { name: { $regex: req.params.keyword, $options: 'i' } },
            { email: { $regex: req.params.keyword, $options: 'i' } },
            { address: { $regex: req.params.keyword, $options: 'i' } },
            { phone: { $regex: req.params.keyword, $options: 'i' } },
        ]
    });

    res.json(contacts);
});
