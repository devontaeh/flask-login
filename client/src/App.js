import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

function App() {
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    fetch("/get-csrf-token")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json(); //parse the the response
      })
      .then((data) => {
        console.log(data);
        setCsrfToken(data.csrfToken);
      })
      .catch((error) => console.log("Error fetching CSRF Token:", error));
  }, []);
  return (
    <Router>
      <Routes>
        {/* Set SignIn as the default route */}
        <Route path="/" element={<SignIn csrfToken={csrfToken} />} />

        {/* Route for SignUp */}
        <Route path="/signup" element={<SignUp csrfToken={csrfToken} />} />

        {/* Redirect to SignIn if no other route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
