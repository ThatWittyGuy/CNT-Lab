
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/catalogue");
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  if (showRegister) {
    return <Register />;
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterClick}>Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "250px", margin: "auto" }
};

export default Login;
