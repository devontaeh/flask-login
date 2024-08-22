import React from "react";
import { Avatar, Button, Container, Typography, Box } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard({ csrfToken }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { username } = state;

  const handleLogout = () => {
    try{
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

      navigate('/');
      console.log("Logout successful");


    }catch(error){
      console.log("Logout failed: ", error)
    }
    // fetch("/logout", {
    //   method: "POST",
    //   credentials: "include", // necessary for cookies to be sent
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": csrfToken,
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Network response was not ok");
    //   })

    //   .then((data) => {
    //     // console.log(data);
    //     if (data.success) {
    //       console.log(data.message);
    //       navigate("/");
    //     } else {
    //       console.log(data.message);
    //       //Preform actions for failed login
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Logout failed:", error);
    //     // Handle network errors or other unexpected issues
    //   });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* User's Profile Picture */}
        <Avatar
          sx={{ m: 1, bgcolor: deepOrange[500], width: 100, height: 100 }}
        >
          {/* Assuming the username's first letter as the Avatar text */}
          {username.charAt(0).toUpperCase()}
        </Avatar>

        {/* Displaying Username */}
        <Typography component="h1" variant="h5">
          {username}
        </Typography>

        {/* Logout Button */}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}
