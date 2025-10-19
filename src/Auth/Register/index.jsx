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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
        });
      });
      return;
    }

    setLoading(true);
    setErrors({});

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

      toast.success("Registration Successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Fetch programs and navigate to dashboard
      await fetchAllPrograms();
      navigate("/dashboard/home");
    } catch (err) {
      let errorMessage;
      if (err.response?.status === 400) {
        if (err.response.data.email) {
          errorMessage = "Email is already registered.";
        } else if (err.response.data.password) {
          errorMessage = "Password is too weak or invalid.";
        } else {
          errorMessage = "Invalid registration details.";
        }
      } else if (err.response?.status === 409) {
        errorMessage = "User with this email already exists.";
      } else if (err.request) {
        errorMessage =
          "Unable to connect to the server. Please check your network.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }

      setErrors({ general: errorMessage });
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
            className={errors.fullName ? styles.errorInput : ""}
          />
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.errorInput : ""}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.errorInput : ""}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          {errors.general && <p className={styles.error}>{errors.general}</p>}

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
