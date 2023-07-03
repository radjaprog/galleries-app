import React, { useEffect, useState } from "react";
import Router from "./Router";
import "./App.css";
import useAuth from "./hooks/useAuth";

function App() {
  const { refresh } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    refresh();
    setIsLoading(false);
  }, []);

  return (
    <div className="App">{!isLoading ? <Router /> : <p>Loading...</p>}</div>
  );
}

export default App;
