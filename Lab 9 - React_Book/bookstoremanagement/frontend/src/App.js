
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Catalogue from "./components/Catalogue";

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Online Book Store</h1>
        <Routes>
          {/* Home page: show Register and Login */}
          <Route
            path="/"
            element={
              <div>
                <Login />
              </div>
            }
          />

          {/* Catalogue page */}
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
