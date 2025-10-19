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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
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
      const formBody = new URLSearchParams();
      formBody.append("email", email);
      formBody.append("password", password);

      const loginRes = await axios.post(
        "https://teenvision-1.onrender.com/api/v1/auth/login/",
        formBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      let access = loginRes.data?.access;
      let refresh = loginRes.data?.refresh;
      let user = loginRes.data?.user;

      if (!access || !refresh) {
        const tokenRes = await axios.post(
          "https://teenvision-1.onrender.com/api/v1/auth/token/",
          { email, password }
        );
        access = tokenRes.data?.access;
        refresh = tokenRes.data?.refresh;
      }

      if (!access || !refresh) {
        throw new Error("Authentication failed: tokens not provided by server");
      }

      if (!user) {
        user = { email };
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      try {
        if (user?.id) {
          const adminResponse = await axios.get(
            `https://teenvision-1.onrender.com/api/v1/admins/${user.id}/`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
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
        } else {
          await fetchAllPrograms();
          navigate("/dashboard/home");
        }
      } catch (adminErr) {
        await fetchAllPrograms();
        navigate("/dashboard/home");
      }
    } catch (err) {
      let errorMessage;
      if (err.response?.status === 400) {
        errorMessage = "Invalid email or password.";
      } else if (err.response?.status === 401) {
        errorMessage = "Unauthorized: Incorrect credentials.";
      } else if (err.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
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
    <div className={`page-root ${styles.login}`}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <button
          className={styles.backButton}
          type="button"
          onClick={() => navigate("/")}
        >
          <svg
            className={styles.backIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Landing
        </button>
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
