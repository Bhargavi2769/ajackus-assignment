import React from "react";
import { TextField, Button, Typography, Box, Modal } from "@mui/material";

class UserForm extends React.Component {
  state = {
    errors: {}
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.props.onChange({ [name]: value });
  };

  validateForm = () => {
    const { form } = this.props;
    let errors = {};
    let formIsValid = true;

    // Check for required fields
    if (!form.firstName) {
      errors.firstName = "* First Name is required";
      formIsValid = false;
    }
    if (!form.lastName) {
      errors.lastName = "* Last Name is required";
      formIsValid = false;
    }
    if (!form.email) {
      errors.email = "* Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "* Email format is invalid";
      formIsValid = false;
    }
    if (!form.department) {
      errors.department = "* Department is required";
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.onSubmit(e);
    }
  };

  render() {
    const { form, isEditing, onClose } = this.props;
    const { errors } = this.state;

    return (
      <Modal open={true} onClose={onClose}>
        <Box
          sx={{
            padding: 4,
            maxWidth: 400,
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            outline: "none",
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            {isEditing ? "Edit User" : "Add User"}
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <TextField
              label="ID"
              name="id"
              type="number"
              value={form.id}
              onChange={this.handleInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "16px" }}
              required
              disabled={isEditing}
            />
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={this.handleInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "16px" }}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={this.handleInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "16px" }}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={this.handleInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "16px" }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Department"
              name="department"
              value={form.department}
              onChange={this.handleInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "16px" }}
              error={!!errors.department}
              helperText={errors.department}
            />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Close
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {isEditing ? "Update" : "Add"} User
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    );
  }
}

export default UserForm;
