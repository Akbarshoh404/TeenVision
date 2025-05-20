import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";
import img from "../../../../Components/images/cardexample.png";

const initialPrograms = [
  {
    id: "1",
    title: "Summer Coding Bootcamp",
    desc: "Learn coding with hands-on projects in a fun setting.",
    fullInfo:
      "This intensive bootcamp covers Python, JavaScript, and web development basics.",
    date: "2025-06-01",
    deadline: "2025-05-15",
    link: "https://example.com/coding-bootcamp",
    country: "USA",
    format: "In-person",
    photo: img,
    type: "Workshop",
    funding: "Partial",
    start_age: 12,
    end_age: 18,
    gender: "All",
    major: ["CS"],
  },
];

const DashboardAdminNewPrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [programs, setPrograms] = useState(initialPrograms);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editProgramId, setEditProgramId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    fullInfo: "",
    date: "",
    deadline: "",
    link: "",
    country: "",
    format: "",
    type: "",
    funding: "",
    start_age: "",
    end_age: "",
    gender: "",
    major: "",
  });
  const location = useLocation();

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const openForm = (program = null) => {
    if (program) {
      setFormData({
        ...program,
        major: program.major.join(", "),
      });
      setEditProgramId(program.id);
    } else {
      setFormData({
        title: "",
        desc: "",
        fullInfo: "",
        date: "",
        deadline: "",
        link: "",
        country: "",
        format: "",
        type: "",
        funding: "",
        start_age: "",
        end_age: "",
        gender: "",
        major: "",
      });
      setEditProgramId(null);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditProgramId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const programData = {
      ...formData,
      major: formData.major
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m),
      photo: img,
    };

    if (editProgramId) {
      setPrograms(
        programs.map((p) =>
          p.id === editProgramId ? { ...programData, id: p.id } : p
        )
      );
    } else {
      const id = (programs.length + 1).toString();
      setPrograms([...programs, { ...programData, id }]);
    }
    closeForm();
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
            <h2 className={styles.sectionTitle}>Manage Programs</h2>
            {isFormOpen ? (
              <div className={styles.programForm}>
                <h3>{editProgramId ? "Edit Program" : "Add New Program"}</h3>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
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
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Full Info</label>
                    <textarea
                      name="fullInfo"
                      value={formData.fullInfo}
                      onChange={handleInputChange}
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
                      <option value="">Select Format</option>
                      <option value="In-person">In-person</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
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
                      <option value="">Select Funding</option>
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
                      <option value="">Select Gender</option>
                      <option value="All">All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Majors (comma-separated)</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      placeholder="e.g., CS, Math, Science"
                      required
                    />
                  </div>
                  <div className={styles.formButtons}>
                    <button type="submit" className={styles.submitButton}>
                      {editProgramId ? "Update Program" : "Add Program"}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={closeForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className={styles.cards}>
                <div className={styles.card}>
                  <div className={styles.addCard}>
                    <button
                      className={styles.addButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                {programs.map((program) => (
                  <div key={program.id} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img src={program.photo} alt={program.title} />
                    </div>
                    <div className={styles.cardMajors}>
                      {program.major.map((major, index) => (
                        <span key={index} className={styles.majorButton}>
                          {major}
                        </span>
                      ))}
                    </div>
                    <h3 className={styles.cardTitle}>{program.title}</h3>
                    <div className={styles.cardInfoRow}>
                      <span className={styles.cardCountry}>
                        {program.country}
                      </span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.cardType}>{program.type}</span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.cardDate}>{program.date}</span>
                    </div>
                    <p className={styles.cardDescription}>{program.desc}</p>
                    <button
                      className={styles.editButton}
                      onClick={() => openForm(program)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdminNewPrograms;
