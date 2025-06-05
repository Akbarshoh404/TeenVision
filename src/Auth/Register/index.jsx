import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare form data for the register endpoint
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("password", password);

      // Make API request to register endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Save user data and tokens to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ email, full_name: fullName })
      );
      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      }

      console.log("Successful registration");

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.detail ||
            Object.values(err.response.data).join(" ") ||
            "Registration failed. Please check your inputs."
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please check if the backend is running."
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Registration error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div className={styles.texts}>
            <p className={styles.p1}>Sign Up</p>
            <p className={styles.p2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry.
            </p>
          </div>

          <form className={styles.inputs} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Registering..." : "Continue"}
            </button>
          </form>

          <p className={styles.p3}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
