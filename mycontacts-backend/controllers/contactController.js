const asyncHandler = require("express-async-handler");
const Contact  =require("../models/contactModel")
//@desc GET all contacts

//@routes GET /api/contacts

//@access public 

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

//@desc GET all contacts

//@routes GET /api/contacts

//@access public 

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(400);
        throw new Error('Error not Found')
    } else {
        res.status(200).send(contact);
    }
})

//@desc create a  contacts

//@routes POST /api/contacts

//@access public 

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields Are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })

    res.status(201).json(contact);
})


//@desc update a  contacts

//@routes PUT /api/contacts:id

//@access public 

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(400);
        throw new Error('Error not Found')
    } 

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
})


//@desc delete a  contacts

//@routes DELETE /api/contacts/:id

//@access public 

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(400);
        throw new Error('Error not Found')
    } 

    await Contact.remove();
    res.status(200).send(contact);
})


module.exports ={ getContacts, getContact, createContact, updateContact, deleteContact };