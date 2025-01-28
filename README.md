# ajackus-assignment

# User Management Application

This project is a simple web application where users can view, add, edit, and delete user details using a mock backend API.

---

## Features

### User Interface
- Displays a list of users with details such as **ID**, **First Name**, **Last Name**, **Email**, and **Department**.
- Includes buttons to **Add**, **Edit**, and **Delete** users.
- Provides a responsive form to input details of a new user or edit existing user details.

### Backend Interaction
- Uses `JSONPlaceholder` as the mock backend API.
- Interacts with the `/users` endpoint for all CRUD operations:
  - **GET**: Fetch and display the list of users.
  - **POST**: Add a new user (simulated success response).
  - **PUT**: Edit an existing user's details.
  - **DELETE**: Remove a user from the list.

### Error Handling
- Implements an `ErrorBoundary` component to gracefully handle unexpected errors.
- Displays user-friendly error messages if API requests fail.

### Toast Notifications
To enhance user feedback, **React Toastify** has been integrated into the application for displaying success and error messages during various user interactions.

#### Usage
1. **Success Messages**:
   - Displayed when operations like adding, editing, or deleting a user are completed successfully.
2. **Error Messages**:
   - Displayed when an API request fails, or when invalid input is provided.

#### Implementation
- `toast.success`: Used to notify users of successful actions.
- `toast.error`: Used to alert users about errors or issues.

#### Example Code Snippets
In `UserList` or `UserForm` components:
```javascript
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.success("User added successfully!");
toast.error("Failed to fetch user data. Please try again later.");
```

#### Installation
To use toast notifications, ensure you have installed `react-toastify`:
```bash
npm install react-toastify
```

#### Benefits
- Provides clear, user-friendly feedback.
- Non-intrusive and customizable notification system.

---

## Directory Structure

```
src/
├── components/
│   ├── userList/userList.jsx               # Displays the list of users
│   ├── userForm/userForm.jsx               # Handles adding and editing users
│   └── errorBoundary/errorBoundary.jsx     # Handles application errors
├── App.js                                  # Main application component
├── index.js                                # Entry point of the app
```

---

## Components

### App Component
The root component that renders the `UserList` component.

### UserList Component
- Fetches the list of users from the `/users` endpoint.
- Displays users in a table format with options to edit or delete.

### UserForm Component
- A reusable form for adding or editing user details.
- Includes client-side validation for required fields and email format.
- Uses Material-UI for styling and layout.

### ErrorBoundary Component
- Catches JavaScript errors in its child component tree.
- Displays an error message without crashing the app.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Bhargavi2769/ajackus-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd user-management-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

---

## Deployment

The application is deployed on Vercel and can be accessed at:
[https://ajackus-assignment-nm1w.vercel.app/](https://ajackus-assignment-nm1w.vercel.app/)

---

## Assumptions
- The application uses `JSONPlaceholder` for demonstration purposes, and data persistence is not implemented.
- The `/users` endpoint supports basic CRUD operations (simulated by the API).

---

## Challenges Faced
- Handling API failures gracefully.
- Implementing form validation and ensuring a responsive design.

---

## Potential Improvements
- Add pagination or infinite scrolling for the user list.
- Enhance the form UI with dynamic field validation feedback.

---

## Dependencies
- React: Frontend library.
- Material-UI: Styling and layout.
- Axios: HTTP client for API interactions.
- React Toastify: Toast notification library.

---

## License
This project is licensed under the MIT License.

