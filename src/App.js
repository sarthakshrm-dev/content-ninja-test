import React, { useEffect, useState } from 'react';
import { Container, Button, CssBaseline, Grid } from '@mui/material';
import ContactTable from './components/ContactTable';
import AddContactForm from './components/AddContactForm';
import './App.css'
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(null)
  const [isAddContactOpen, setAddContactOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const page = new URLSearchParams(window.location.search).get('page');

  useEffect(() => {
    if (!page || page<1) {
      window.location.href = '/?page=1';
    }
  }, [page])

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3000/api?page=${page}`).then((res) => {
      setLoading(false)
      console.log(res.data);
      setContacts(res.data.getContactResponse.results)
      setTotalContacts(res.data.totalContacts)
    })
  }, [])

  const handleEdit = (id, values) => {
    setLoading(true)
    axios.put(`http://localhost:3000/api/${id}`, values).then((res) => {
      axios.get(`http://localhost:3000/api?page=${page}`).then((res) => {
        setContacts(res.data.getContactResponse.results)
        setTotalContacts(res.data.totalContacts)
        setLoading(false)
      })
    })
  };

  const handleDelete = (id) => {
    setLoading(true)
    axios.delete(`http://localhost:3000/api/${id}`).then((res) => {
      axios.get(`http://localhost:3000/api?page=${page}`).then((res) => {
        setContacts(res.data.getContactResponse.results)
        setTotalContacts(res.data.totalContacts)
        setLoading(false)
      })
    })
  };

  const handleAddContact = (values) => {
    setLoading(true)
    axios.post(`http://localhost:3000/api?page=${page}`, values).then((res) => {
      setContacts([res.data.createContactResponse, ...contacts])
      setTotalContacts(totalContacts + 1)
      setLoading(false)
    })
  };

  const openAddContactForm = () => {
    setAddContactOpen(true);
  };

  const closeAddContactForm = () => {
    setAddContactOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={openAddContactForm}>
            Add Contact
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ContactTable page={page} contacts={contacts} totalContacts={totalContacts} loading={loading} setLoading={setLoading} handleEdit={handleEdit} handleDelete={handleDelete} />
        </Grid>
      </Grid>
      <AddContactForm open={isAddContactOpen} handleClose={closeAddContactForm} handleAddContact={handleAddContact} />
    </Container>
  );
};

export default App;
