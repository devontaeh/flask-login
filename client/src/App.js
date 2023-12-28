import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Set SignIn as the default route */}
        <Route path="/" element={<SignIn />} />

        {/* Route for SignUp */}
        <Route path="/signup" element={<SignUp />} />

        {/* Redirect to SignIn if no other route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
