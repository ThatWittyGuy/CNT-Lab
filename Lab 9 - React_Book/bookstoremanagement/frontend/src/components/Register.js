
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post("http://localhost:5000/api/auth/register", user);
      setMessage(res.data.message || "Registration successful!");
    } catch (err) {
      setMessage("Registration failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "250px", margin: "auto" }
};

export default Register;
