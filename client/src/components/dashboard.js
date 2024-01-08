import React from "react";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const {state} = useLocation()
  const {username} = state
  return (
    <div>
      <h1>Welcome {username} !</h1>
      <h2>
        <Link href='/signin'>Logout</Link>
      </h2>
    </div>
  );
}

export default Dashboard;
