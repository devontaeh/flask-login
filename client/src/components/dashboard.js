import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const {state} = useLocation()
  const {username} = state
  return (
    <div>
      <h1>Welcome {username} !</h1>
    </div>
  );
}

export default Dashboard;
