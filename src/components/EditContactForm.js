import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const validationSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EditContactForm = ({ open, handleClose, handleEdit, editFields }) => {

  useEffect(() => {
    formik.setValues({
      firstname: editFields && editFields.properties ? editFields.properties.firstname || '' : '',
      lastname: editFields && editFields.properties ? editFields.properties.lastname || '' : '',
      email: editFields && editFields.properties ? editFields.properties.email || '' : '',
    });
  }, [editFields]);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleEdit(editFields.id, values);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Contact</DialogTitle>
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
              Save
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

export default EditContactForm;
