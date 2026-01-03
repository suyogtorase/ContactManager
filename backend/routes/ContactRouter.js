import express from 'express';
import { getAllContacts, submitUserContact, deleteContact } from '../controller/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/submit-contact', submitUserContact)
contactRouter.get('/get-contacts', getAllContacts)
contactRouter.delete('/delete-contact/:id', deleteContact)

export default contactRouter;