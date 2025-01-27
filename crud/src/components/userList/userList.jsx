import React from "react";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import UserForm from "../userForm/userForm";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class UserList extends React.Component {
    state = {
        users: [],
        form: { id: "", firstName: "", lastName: "", email: "", department: "" },
        editingUserId: null,
        modalOpen: false,
        error: null,
        currentPage: 1,
        usersPerPage: 3, // Adjust number of users per page here
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();
            this.setState({
                users: users.map((user) => ({
                    id: user.id,
                    firstName: user.name.split(" ")[0],
                    lastName: user.name.split(" ")[1] || "",
                    email: user.email,
                    department: user.company.name,
                })),
            });
        } catch {
            this.setState({ error: "Failed to fetch users." });
        }
    };

    handleInputChange = (formData) => {
        this.setState({ form: { ...this.state.form, ...formData } });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { form, users, editingUserId } = this.state;

        const isIdDuplicate = users.some((user) => user.id === parseInt(form.id, 10));
        if (!editingUserId && isIdDuplicate) {
            toast.error("The entered ID is already in use. Please enter a unique ID.");
            return;
        }

        if (editingUserId) {
            try {
                await fetch(`https://jsonplaceholder.typicode.com/users/${editingUserId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                const updatedUsers = users.map((user) =>
                    user.id === editingUserId ? { ...form, id: editingUserId } : user
                );
                this.setState({ users: updatedUsers, modalOpen: false, editingUserId: null, form: { id: "", firstName: "", lastName: "", email: "", department: "" } });
                toast.success("User updated successfully!");
            } catch {
                this.setState({ error: "Failed to update user." });
                toast.error("Failed to update user.");
            }
        } else {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                const newUser = await response.json();
                this.setState({
                    users: [...users, { ...form, id: parseInt(form.id, 10) }],
                    modalOpen: false,
                    form: { id: "", firstName: "", lastName: "", email: "", department: "" },
                });
                toast.success("User added successfully!");
            } catch {
                this.setState({ error: "Failed to add user." });
                toast.error("Failed to add user.");
            }
        }
    };

    handleEditClick = (userId) => {
        const userToEdit = this.state.users.find((user) => user.id === userId);
        this.setState({ form: { ...userToEdit }, editingUserId: userId, modalOpen: true });
    };

    handleDeleteClick = async (userId) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { method: "DELETE" });
            const updatedUsers = this.state.users.filter((user) => user.id !== userId);
            this.setState({ users: updatedUsers });
            toast.success("User deleted successfully!");
        } catch {
            this.setState({ error: "Failed to delete user." });
            toast.error("Failed to delete user.");
        }
    };

    handleAddClick = () => {
        this.setState({ modalOpen: true, form: { id: "", firstName: "", lastName: "", email: "", department: "" }, editingUserId: null });
    };

    handleCloseModal = () => {
        this.setState({ modalOpen: false, editingUserId: null });
    };

    // Pagination handlers
    handleNextPage = () => {
        const { currentPage, usersPerPage, users } = this.state;
        const totalPages = Math.ceil(users.length / usersPerPage);
        if (currentPage < totalPages) {
            this.setState({ currentPage: currentPage + 1 });
        }
    };

    handlePreviousPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
        }
    };

    render() {
        const { users, form, modalOpen, error, editingUserId, currentPage, usersPerPage } = this.state;
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

        return (
            <ErrorBoundary>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            fontSize: "14px",
                        },
                    }}
                />
                <Card variant="outlined" sx={{ maxWidth: 900, margin: "auto" }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom align="center">
                            Users List
                        </Typography>
                        {error && <Typography color="error" align="center">{error}</Typography>}

                        <Button variant="contained" color="primary" onClick={this.handleAddClick} style={{ marginBottom: "16px" }}>
                            Add User
                        </Button>

                        <Box display="flex" flexWrap="wrap" gap="16px">
                            {currentUsers.map((user) => (
                                <Box
                                    key={user.id}
                                    sx={{
                                        width: { xs: "100%", sm:  "48%", md:  "30%" },
                                        padding: "16px",
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <div>
                                        <Typography variant="subtitle1"><strong>ID:</strong> {user.id}</Typography>
                                        <Typography variant="subtitle1"><strong>First Name:</strong> {user.firstName}</Typography>
                                        <Typography variant="subtitle1"><strong>Last Name:</strong> {user.lastName}</Typography>
                                        <Typography variant="subtitle1"><strong>Email:</strong> {user.email}</Typography>
                                        <Typography variant="subtitle1"><strong>Department:</strong> {user.department}</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                                        <Button variant="contained" color="primary" onClick={() => this.handleEditClick(user.id)} style={{ width: "48%" }}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => this.handleDeleteClick(user.id)} style={{ width: "48%" }}>
                                            Delete
                                        </Button>
                                    </div>
                                </Box>
                            ))}
                        </Box>

                        <Box display="flex" justifyContent="center" style={{ marginTop: "20px" }}>
                            
                            <Button variant="contained" color="primary" startIcon={<ArrowBackIosIcon />} onClick={this.handlePreviousPage} disabled={currentPage === 1}>
                                
                            </Button>
                            <Typography variant="h6" style={{ margin: "0 16px" }}>
                                Page {currentPage}
                            </Typography>
                            <Button variant="contained" onClick={this.handleNextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)} endIcon={<ArrowForwardIosIcon />}>
                                
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {modalOpen && (
                    <UserForm
                        form={form}
                        isEditing={!!editingUserId}
                        onChange={this.handleInputChange}
                        onSubmit={this.handleSubmit}
                        onClose={this.handleCloseModal}
                    />
                )}
            </ErrorBoundary>
        );
    }
}

export default UserList;
