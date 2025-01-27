import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/userForm/userForm";
import UserList from "./components/userList/userList";
// import UserLists from "./components/userList/userLists";

const App = () => {
  return (
      <div>
          <UserList />

      </div>
  );
};

export default App;
