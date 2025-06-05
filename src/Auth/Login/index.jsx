import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Make API request to the correct token endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/token/", // Updated endpoint
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log user information to the console
      console.log("User  Information:", response.data);

      // Save user data and tokens to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      console.log("User  data saved to localStorage:", response.data);

      // Fetch all programs after successful login
      await fetchAllPrograms();

      // Navigate to dashboard
      navigate("/dashboard/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || "Invalid email or password");
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please check if the backend is running."
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Login error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPrograms = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/programs/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Use the access token for authorization
          },
        }
      );

      // Log all programs to the console
      console.log("All Programs:", response.data);

      // Save programs data to localStorage
      localStorage.setItem("programs", JSON.stringify(response.data.results));
      console.log(
        "Programs data saved to localStorage:",
        response.data.results
      );
    } catch (err) {
      console.error(
        "Error fetching programs:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.texts}>
          <p className={styles.p1}>Sign in</p>
          <p className={styles.p2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </p>
        </div>

        <form className={styles.inputs} onSubmit={handleSubmit}>
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
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <p className={styles.p3}>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
