import React, { useState, useCallback, useRef } from "react";
import styles from "./style.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";

const DashboardAdminCreatePrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    fullInfo: "",
    date: "",
    deadline: "",
    link: "",
    country: "",
    format: "",
    photos: [null, null, null, null],
    type: "",
    funding: "",
    start_age: "",
    end_age: "",
    gender: "",
    major: "",
  });

  const [photoPreviews, setPhotoPreviews] = useState([null, null, null, null]);
  const carouselRef = useRef(null);
  const addPhotoInputRef = useRef(null);

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "add_photo" && files[0]) {
      const file = files[0];
      const newPhotos = [...formData.photos];
      const newPreviews = [...photoPreviews];

      const emptyIndex = newPhotos.findIndex((p) => p === null);
      if (emptyIndex === -1) return;

      newPhotos[emptyIndex] = file;
      setFormData((prev) => ({ ...prev, photos: newPhotos }));

      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[emptyIndex] = reader.result;
        setPhotoPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const triggerAddPhotoInput = () => {
    if (addPhotoInputRef.current) {
      addPhotoInputRef.current.click();
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const programData = {
      ...formData,
      major: formData.major
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m),
    };
    console.log("Submitted Program Data:", programData);

    setFormData({
      title: "",
      desc: "",
      fullInfo: "",
      date: "",
      deadline: "",
      link: "",
      country: "",
      format: "",
      photos: [null, null, null, null],
      type: "",
      funding: "",
      start_age: "",
      end_age: "",
      gender: "",
      major: "",
    });
    setPhotoPreviews([null, null, null, null]);
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
              {/* Text Inputs */}
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
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Full Info</label>
                <textarea
                  name="fullInfo"
                  value={formData.fullInfo}
                  onChange={handleInputChange}
                  placeholder="Enter detailed program information"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Start Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
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
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Format</label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select format</option>
                  <option value="In-person">In-person</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Photos</label>
                <div className={styles.carouselContainer}>
                  <button
                    type="button"
                    className={styles.carouselButton}
                    onClick={() => scrollCarousel("left")}
                  >
                    &lt;
                  </button>

                  <div className={styles.photoCarousel} ref={carouselRef}>
                    <div
                      className={`${styles.photoCard} ${styles.addPhotoCard}`}
                      onClick={triggerAddPhotoInput}
                    >
                      <div className={styles.emptyPhotoCard}>
                        <span className={styles.addPhotoText}>+ Add Photo</span>
                      </div>
                    </div>

                    {photoPreviews.map(
                      (preview, index) =>
                        preview && (
                          <div key={index} className={styles.photoCard}>
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className={styles.photoImage}
                            />
                          </div>
                        )
                    )}
                    <input
                      type="file"
                      name="add_photo"
                      accept="image/*"
                      ref={addPhotoInputRef}
                      onChange={handleInputChange}
                      className={styles.photoInput}
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.carouselButton}
                    onClick={() => scrollCarousel("right")}
                  >
                    &gt;
                  </button>
                </div>
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
                  <option value="Workshop">Workshop</option>
                  <option value="Training">Training</option>
                  <option value="Internship">Internship</option>
                  <option value="Camp">Camp</option>
                  <option value="Course">Course</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Funding</label>
                <select
                  name="funding"
                  value={formData.funding}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select funding</option>
                  <option value="Full">Full</option>
                  <option value="Partial">Partial</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Start Age</label>
                <input
                  type="number"
                  name="start_age"
                  value={formData.start_age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>End Age</label>
                <input
                  type="number"
                  name="end_age"
                  value={formData.end_age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Any">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Major</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Engineering"
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Submit Program
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdminCreatePrograms;
