import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://teenvision-1.onrender.com/api/v1/auth/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ email, full_name: fullName })
      );
      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      }

      toast.success("Registration Successful! Please sign in.", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).join(" ") ||
        err.request
          ? "Unable to connect to the server. Please check if the backend is running."
          : "An unexpected error occurred.";

      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`page-root ${styles.register}`}>
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
            className={error ? styles.errorInput : ""}
          />
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
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Sign In
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
