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
      // Use the URL you confirmed as working
      const response = await axios.post(
        "https://teenvision-1.onrender.com/api/v1/auth/login/",
        { email, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Log full response to debug
      console.log("Login Response:", response.data);

      // Check if response contains expected data (user, access, refresh tokens)
      if (!response.data.access || !response.data.refresh || !response.data.user) {
        throw new Error("Invalid response format: Missing tokens or user data");
      }

      // Save user data and tokens to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      console.log("User data saved to localStorage:", response.data);

      // Attempt to fetch admin status
      try {
        const adminResponse = await axios.get(
          "https://teenvision-1.onrender.com/api/v1/api/v1/admins/",
          {
            headers: {
              Authorization: `Bearer ${response.data.access}`,
            },
          }
        );

        console.log("Admin Response:", adminResponse.data);

        navigate("/dashboard/admin/new-programs");
      } catch (adminErr) {
        console.warn(
          "Not an admin user:",
          adminErr.response?.data || adminErr.message
        );

        // Fetch all programs for non-admin users
        await fetchAllPrograms();

        navigate("/dashboard/home");
      }
    } catch (err) {
      // Enhanced error handling
      if (err.response) {
        setError(
          err.response.data.detail ||
            err.response.data.message ||
            "Invalid email or password"
        );
      } else if (err.request) {
        setError("Unable to connect to the server. Please check if the backend is running.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      console.error("Login error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPrograms = async () => {
    try {
      const response = await axios.get(
        "https://teenvision-1.onrender.com/api/v1programs/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("All Programs:", response.data);

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