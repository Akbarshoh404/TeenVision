import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await axios.post(
        "https://teenvision-1.onrender.com/api/v1/auth/login/",
        { email, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (
        !response.data.access ||
        !response.data.refresh ||
        !response.data.user
      ) {
        throw new Error("Invalid response format: Missing tokens or user data");
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Fetch user details to check is_staff
      try {
        const adminResponse = await axios.get(
          `https://teenvision-1.onrender.com/api/v1/admins/${response.data.user.id}/`,
          {
            headers: {
              Authorization: `Bearer ${response.data.access}`,
            },
          }
        );

        const { is_staff } = adminResponse.data;

        if (is_staff) {
          navigate("/dashboard/admin/new-programs");
        } else {
          await fetchAllPrograms();
          navigate("/dashboard/home");
        }
      } catch (adminErr) {
        await fetchAllPrograms();
        navigate("/dashboard/home");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || err.response?.data?.message || err.request
          ? "Unable to connect to the server. Please check if the backend is running."
          : err.message || "An unexpected error occurred.";

      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPrograms = async () => {
    try {
      const response = await axios.get(
        "https://teenvision-1.onrender.com/api/v1/programs/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      localStorage.setItem("programs", JSON.stringify(response.data.results));
    } catch (err) {
      toast.error("Failed to fetch programs", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className={`page-root ${styles.login}`}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <div className={styles.texts}>
          <p className={styles.p1}>Sign In</p>
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
            className={error ? styles.errorInput : ""}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={error ? styles.errorInput : ""}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? <span className={styles.loader}></span> : "Continue"}
          </button>
        </form>

        <p className={styles.p3}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
