import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";

const DashboardAdminCreatePrograms = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [error, setError] = useState(null);
  const [majors, setMajors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    desc: "",
    full_info: "",
    deadline: "",
    link: "",
    country: "",
    format: "",
    photo: "", // Single photo URL
    type: "",
    funding: "",
    start_age: "",
    end_age: "",
    gender: "",
    status: "on",
    major: [],
  });

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("No authentication token found. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
        const response = await fetch(
          "https://teenvision-1.onrender.com/api/v1/majors/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
          throw new Error(`Failed to fetch majors: ${response.status}`);
        }
        const data = await response.json();
        setMajors(data.results || []);
      } catch (err) {
        console.error("Fetch Majors Error:", err);
        setError("Failed to load majors: " + err.message);
      }
    };
    fetchMajors();
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "major") {
      const selectedIds = Array.from(event.target.selectedOptions).map(
        (option) => parseInt(option.value, 10)
      );
      setFormData((prev) => ({ ...prev, major: selectedIds }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No authentication token found. Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      const programData = new FormData();
      programData.append("title", formData.title);
      if (formData.slug) programData.append("slug", formData.slug);
      if (formData.desc) programData.append("desc", formData.desc);
      if (formData.full_info)
        programData.append("full_info", formData.full_info);
      if (formData.deadline) programData.append("deadline", formData.deadline);
      programData.append("link", formData.link);
      if (formData.country) programData.append("country", formData.country);
      if (formData.format) programData.append("format", formData.format);
      if (formData.photo) programData.append("photo", formData.photo); // Single photo URL
      programData.append("type", formData.type);
      if (formData.funding) programData.append("funding", formData.funding);
      if (formData.start_age)
        programData.append("start_age", parseInt(formData.start_age, 10));
      if (formData.end_age)
        programData.append("end_age", parseInt(formData.end_age, 10));
      if (formData.gender) programData.append("gender", formData.gender);
      programData.append("status", formData.status);

      if (formData.major.length > 0) {
        programData.append("major", JSON.stringify(formData.major));
      }

      const response = await fetch(
        "https://teenvision-1.onrender.com/api/v1/programs/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: programData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Create Program Error Response:", errorData);
        if (response.status === 401) {
          setError("Unauthorized. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
        throw new Error(
          errorData.detail ||
            JSON.stringify(errorData) ||
            `Failed to create program: ${response.status}`
        );
      }

      setFormData({
        title: "",
        slug: "",
        desc: "",
        full_info: "",
        deadline: "",
        link: "",
        country: "",
        format: "",
        photo: "",
        type: "",
        funding: "",
        start_age: "",
        end_age: "",
        gender: "",
        status: "on",
        major: [],
      });
      navigate("/dashboard/admin/new-programs");
    } catch (err) {
      console.error("Submit Error:", err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.dashboard}>
      <DashboardAdminNavbar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        closeNav={closeNav}
      />
      <DashboardTopBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <main
        className={`${styles.mainContent} ${isNavOpen ? styles.navOpen : ""}`}
      >
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Add Program</h2>
            <form className={styles.programForm} onSubmit={handleSubmit}>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter program title"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="Enter program slug (e.g., robotics-cup)"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Enter short description"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Full Description</label>
                <textarea
                  name="full_info"
                  value={formData.full_info}
                  onChange={handleInputChange}
                  placeholder="Enter detailed program information"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="e.g., https://example.com"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Format</label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                >
                  <option value="">Select format</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Photo URL</label>
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="program">Program</option>
                  <option value="tutorial">Tutorial</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Funding</label>
                <select
                  name="funding"
                  value={formData.funding}
                  onChange={handleInputChange}
                >
                  <option value="">Select funding</option>
                  <option value="full">Full</option>
                  <option value="partial">Partial</option>
                  <option value="self">Self</option>
                  <option value="sponsorship">Sponsorship</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Start Age</label>
                <input
                  type="number"
                  name="start_age"
                  value={formData.start_age}
                  onChange={handleInputChange}
                  placeholder="Minimum age"
                  min="0"
                />
              </div>
              <div className={styles.formGroup}>
                <label>End Age</label>
                <input
                  type="number"
                  name="end_age"
                  value={formData.end_age}
                  onChange={handleInputChange}
                  placeholder="Maximum age"
                  min="0"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="on">Active</option>
                  <option value="off">Inactive</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Majors</label>
                <select
                  multiple
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={styles.multiSelect}
                >
                  {majors.map((major) => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formButtons}>
                <button type="submit" className={styles.submitButton}>
                  Submit Program
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => navigate("/dashboard/admin/new-programs")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdminCreatePrograms;
