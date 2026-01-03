import { Contact } from '../model/contactModel.js';

export const submitUserContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, error: "All fields are required" })
        }

        if (!/^\d{10}$/.test(phone.toString())) {
            return res.status(400).json({ success: false, error: "Enter a valid 10-digit phone number" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: 'Invalid email format' });
        }

        const newContact = new Contact({
            name: name,
            email: email,
            phone: phone,
            message: message
        })

        await newContact.save();

        return res.status(201).json({ success: true, message: 'Contact submitted successfully', contact: newContact });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: "Email already exists"});
        }   

        console.error('Error submitting contact:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, message: "All contacts are fetched", contacts});
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, error: 'Contact ID is required' });
        }

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Contact deleted successfully',
            deletedContact 
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}