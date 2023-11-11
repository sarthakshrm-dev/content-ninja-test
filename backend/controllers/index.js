const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({ accessToken: 'pat-na1-c4752074-664d-4967-9e49-92e1e5277f67' });

const getAllContacts = async (req, res) => {
    try {
        const { page } = req.query;
        const offset = (parseInt(page) - 1) * 10;

        const publicObjectSearchRequest = {
            sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
            properties: ['email', 'firstname', 'lastname'],
            limit: 10,
            after: offset,
        }

        const totalCountRequest = {
            sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
            properties: ['email', 'firstname', 'lastname'],
        };

        const getContactResponse = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
        const totalContactsResponse = await hubspotClient.crm.contacts.searchApi.doSearch(totalCountRequest);

        const totalContacts = totalContactsResponse.total;
        
        if (!getContactResponse) {
            res.status(400).json({ error: 'No contacts found' });
        }

        res.status(200).json({ getContactResponse, totalContacts, message: 'Contacts retrieved successfully' });
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const createContact = async (req, res) => {
    try {
        const { firstname, lastname, email } = req.body;

        console.log(req.body);

        if (typeof firstname !== 'string' || typeof lastname !== 'string') {
            return res.status(400).json({ error: 'Firstname and lastname must be strings' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        let contactObj = {
            properties: {
                firstname: firstname,
                lastname: lastname,
                email: email
            }
        };

        const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
        res.status(200).json({ createContactResponse, message: 'Contact created successfully' });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editContact = async (req, res) => {
    try {
        const { contactId } = req.params
        const { firstname, lastname, email } = req.body;

        var contactObj = {
            properties: {}
        }

        if (!contactId) {
            return res.status(400).json({ error: 'Contact ID is required' });
        }

        if(firstname!==undefined) {
            if (typeof firstname !== 'string') {
                return res.status(400).json({ error: 'Firstname must be string' });
            }  
        
            contactObj.properties.firstname = firstname;
        }
        
        if(lastname!==undefined) {
            if (typeof lastname !== 'string') {
                return res.status(400).json({ error: 'Lastname must be string' });
            }  
        
            contactObj.properties.lastname = lastname;
        }
        
        if(email!==undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email address' });
            }
        
            contactObj.properties.email = email;
        }

        const updateContactResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, contactObj);
        
        res.status(200).json({ updateContactResponse, message: 'Contact updated successfully' });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;

        const updateContactResponse = await hubspotClient.crm.contacts.basicApi.archive(contactId);
        
        res.status(200).json({ updateContactResponse, message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    editContact,
    deleteContact
};
