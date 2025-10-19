import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";
import img from "../../../../Components/images/cardexample.png";

const DashboardAdminProgramEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [program, setProgram] = useState(null);
  const [majors, setMajors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    full_info: "",
    deadline: "",
    link: "",
    country: "",
    format: "",
    type: "",
    funding: "",
    start_age: "",
    end_age: "",
    gender: "",
    major: [],
    slug: "",
    status: "on",
    photos: [],
  });
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const addPhotoInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("No authentication token found. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        // Fetch majors
        const majorsResponse = await fetch(
          "https://teenvision-1.onrender.com/api/v1/majors/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!majorsResponse.ok) {
          if (majorsResponse.status === 401) {
            setError("Unauthorized. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
          throw new Error("Failed to fetch majors");
        }
        const majorsData = await majorsResponse.json();
        setMajors(majorsData.results || []);

        // Fetch program
        const response = await fetch(
          `https://teenvision-1.onrender.com/api/v1/programs/${slug}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 401) {
            setError("Unauthorized. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
          if (response.status === 404) {
            throw new Error(`Program not found with slug: ${slug}`);
          }
          throw new Error(
            `Failed to fetch program: ${response.status} ${errorText}`
          );
        }

        const foundProgram = await response.json();
        const photos = Array.isArray(foundProgram.photos)
          ? foundProgram.photos
          : foundProgram.photo
          ? [foundProgram.photo]
          : [];

        setProgram(foundProgram);
        setFormData({
          title: foundProgram.title || "",
          desc: foundProgram.desc || "",
          full_info: foundProgram.full_info || "",
          deadline: foundProgram.deadline || "",
          link: foundProgram.link || "",
          country: foundProgram.country || "",
          format: foundProgram.format || "",
          type: foundProgram.type || "",
          funding: foundProgram.funding || "",
          start_age: foundProgram.start_age || "",
          end_age: foundProgram.end_age || "",
          gender: foundProgram.gender || "",
          major: Array.isArray(foundProgram.major) ? foundProgram.major : [],
          slug: foundProgram.slug || "",
          status: foundProgram.status || "on",
          photos,
        });
        setPhotoPreviews(photos);

        // Update localStorage
        const programs = JSON.parse(localStorage.getItem("programs")) || [];
        const updatedPrograms = programs.some((p) => p.slug === slug)
          ? programs.map((p) => (p.slug === slug ? foundProgram : p))
          : [...programs, foundProgram];
        localStorage.setItem("programs", JSON.stringify(updatedPrograms));
      } catch (error) {
        setError(error.message);
        const localPrograms =
          JSON.parse(localStorage.getItem("programs")) || [];
        const localProgram = localPrograms.find((p) => p.slug === slug);
        if (localProgram) {
          const photos = Array.isArray(localProgram.photos)
            ? localProgram.photos
            : localProgram.photo
            ? [localProgram.photo]
            : [];
          setProgram(localProgram);
          setFormData({
            title: localProgram.title || "",
            desc: localProgram.desc || "",
            full_info: localProgram.full_info || "",
            deadline: localProgram.deadline || "",
            link: localProgram.link || "",
            country: localProgram.country || "",
            format: localProgram.format || "",
            type: localProgram.type || "",
            funding: localProgram.funding || "",
            start_age: localProgram.start_age || "",
            end_age: localProgram.end_age || "",
            gender: localProgram.gender || "",
            major: Array.isArray(localProgram.major) ? localProgram.major : [],
            slug: localProgram.slug || "",
            status: localProgram.status || "on",
            photos,
          });
          setPhotoPreviews(photos);
          setError("Program found in localStorage but not in API");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "add_photo" && files && files.length > 0) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newFiles],
      }));
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    } else if (name === "major") {
      const selectedIds = Array.from(event.target.selectedOptions).map(
        (option) => parseInt(option.value, 10)
      );
      setFormData((prev) => ({ ...prev, major: selectedIds }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerAddPhotoInput = () => {
    if (addPhotoInputRef.current) {
      addPhotoInputRef.current.click();
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
      programData.append("type", formData.type);
      if (formData.funding) programData.append("funding", formData.funding);
      if (formData.start_age)
        programData.append("start_age", parseInt(formData.start_age, 10));
      if (formData.end_age)
        programData.append("end_age", parseInt(formData.end_age, 10));
      if (formData.gender) programData.append("gender", formData.gender);
      if (formData.status) programData.append("status", formData.status);
      formData.major.forEach((id) => programData.append("major", id));
      // Include first new photo file under single 'photo' field (backend expects one)
      const firstNewPhoto = formData.photos.find((p) => p instanceof File);
      if (firstNewPhoto) {
        programData.append("photo", firstNewPhoto);
      }

      const response = await fetch(
        `https://teenvision-1.onrender.com/api/v1/programs/${slug}/`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: programData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          setError("Unauthorized. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
        throw new Error(
          `Failed to update program: ${response.status} ${errorText}`
        );
      }

      const updatedProgram = await response.json();
      const programs = JSON.parse(localStorage.getItem("programs")) || [];
      const updatedPrograms = programs.map((p) =>
        p.slug === slug ? updatedProgram : p
      );
      localStorage.setItem("programs", JSON.stringify(updatedPrograms));
      navigate("/dashboard/admin/new-programs");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
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
              <h2 className={styles.sectionTitle}>Loading...</h2>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (error && !program) {
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
              <h2 className={styles.sectionTitle}>Program Not Found</h2>
              <p className={styles.error}>{error}</p>
              <button
                className={styles.editButton}
                onClick={() => navigate("/dashboard/admin/new-programs")}
              >
                Back to Programs
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

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
            <h2 className={styles.sectionTitle}>Edit Program</h2>
            <div className={styles.programForm}>
              <h3>{program.title || "Untitled"}</h3>
              {error && <p className={styles.error}>{error}</p>}
              <form onSubmit={handleSubmit}>
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
                  <label>Full Info</label>
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
                  <label>Location</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Program Format</label>
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Format</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
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
                    <option value="">Select Funding</option>
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
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="any">Any</option>
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
                <div className={styles.formGroup}>
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="e.g., robotics-cup"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Photos</label>
                  <div className={styles.carouselContainer}>
                    <div className={styles.photoCarousel}>
                      {photoPreviews.length > 0
                        ? photoPreviews.map((preview, index) => (
                            <div key={index} className={styles.photoCard}>
                              <img
                                src={preview || img}
                                alt={`Photo ${index + 1}`}
                                className={styles.photoImage}
                                onError={(e) => (e.target.src = img)}
                              />
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => removePhoto(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6L12 12M6 18L12 12M6 6L12 12 18 18" />
                                </svg>
                              </button>
                            </div>
                          ))
                        : null}
                      {photoPreviews.length < 10 && (
                        <div
                          className={`${styles.photoCard} ${styles.addPhotoCard}`}
                          onClick={triggerAddPhotoInput}
                        >
                          <div className={styles.emptyPhotoCard}>
                            <span className={styles.addPhotoText}>
                              Add Photo
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="add_photo"
                      accept="image/*"
                      multiple
                      ref={addPhotoInputRef}
                      onChange={handleInputChange}
                      className={styles.hiddenInput}
                    />
                  </div>
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
                <div className={styles.formButtons}>
                  <button type="submit" className={styles.submitButton}>
                    Update Program
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdminProgramEdit;
