import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, CircularProgress } from '@mui/material';
import EditContactForm from './EditContactForm';

const ContactTable = ({ contacts, handleEdit, handleDelete, totalContacts, loading, page }) => {
  const [isEditContactOpen, setAddContactOpen] = useState(false);
  const [index, setIndex] = useState(null)

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    window.location.href = `/?page=${newPage}`;
  };

  const openEditContactForm = (i) => {
    setIndex(i)
    setAddContactOpen(true);
  };

  const closeEditContactForm = () => {
    setAddContactOpen(false);
  };


  return (
    <div style={{width: '100%'}}>
      <div style={{width: '100%'}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <CircularProgress sx={{ margin: '20px' }} />
            ) : (
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.properties.firstname} {contact.properties.lastname}</TableCell>
                    <TableCell>{contact.properties.email}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => openEditContactForm(index)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(contact.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>)}
          </Table>
        </TableContainer>
        {!loading && <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalContacts}
          rowsPerPage={10}
          page={parseInt(page)}
          onPageChange={handleChangePage}
        />}
      </div>
      <EditContactForm open={isEditContactOpen} handleClose={closeEditContactForm} handleEdit={handleEdit} editFields={contacts[index]} />
    </div>
  );
};

export default ContactTable;
