import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const validationSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const AddContactForm = ({ open, handleClose, handleAddContact }) => {

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleAddContact(values);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstname"
            name="firstname"
            label="First Name"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            fullWidth
            id="lastname"
            name="lastname"
            label="Last Name"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Add
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactForm;
