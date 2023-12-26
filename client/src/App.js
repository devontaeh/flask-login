import React, { useState, useEffect } from "react";

function App() {
  
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/home_data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      {(typeof data.messages === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.messages.map((message, i) =>(
          <p key={i}>{message}</p>
        ))
      )}
    </div>
  );
}

export default App;
