import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";
import img from "../../../../Components/images/cardexample.png";

const DashboardHome = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    age: "",
    gender: "",
    country: "",
    major: "",
    format: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  // Fetch and normalize data from localStorage
  useEffect(() => {
    const storedPrograms = localStorage.getItem("programs");
    let programs = storedPrograms ? JSON.parse(storedPrograms) : [];

    // Normalize data to match expected structure
    programs = programs.map((program) => ({
      ...program,
      photo: program.photo || img, // Fallback to default image if null
      desc: program.desc || "No description available", // Fallback for null desc
      date: program.created_at, // Map created_at to date
      type: program.type || "Program", // Default type if needed
      major: program.major || [], // Ensure major is an array
      gender: program.gender === "any" ? "All" : program.gender.charAt(0).toUpperCase() + program.gender.slice(1), // Normalize gender
      format: program.format
        ? program.format.charAt(0).toUpperCase() + program.format.slice(1)
        : "Unknown", // Capitalize format
    }));

    setFilteredPrograms(programs);
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortCriteria((prev) => ({ ...prev, [name]: value }));

    const storedPrograms = localStorage.getItem("programs");
    let programs = storedPrograms ? JSON.parse(storedPrograms) : [];

    // Normalize data for filtering
    programs = programs.map((program) => ({
      ...program,
      photo: program.photo || img,
      desc: program.desc || "No description available",
      date: program.created_at,
      type: program.type || "Program",
      major: program.major || [],
      gender: program.gender === "any" ? "All" : program.gender.charAt(0).toUpperCase() + program.gender.slice(1),
      format: program.format
        ? program.format.charAt(0).toUpperCase() + program.format.slice(1)
        : "Unknown",
    }));

    let filtered = [...programs];

    if (value === "reset") {
      setSortCriteria({
        age: "",
        gender: "",
        country: "",
        major: "",
        format: "",
      });
      setFilteredPrograms(programs);
      return;
    }

    if (name === "age") {
      if (value === "12-14") {
        filtered = filtered.filter((p) => p.start_age <= 14 && p.end_age >= 12);
      } else if (value === "15-18") {
        filtered = filtered.filter((p) => p.start_age <= 18 && p.end_age >= 15);
      }
    } else if (name === "gender" && value) {
      filtered = filtered.filter(
        (p) => p.gender === value || p.gender === "All"
      );
    } else if (name === "country" && value) {
      filtered = filtered.filter((p) => p.country === value);
    } else if (name === "major" && value) {
      filtered = filtered.filter((p) => p.major.includes(value));
    } else if (name === "format" && value) {
      filtered = filtered.filter((p) => p.format === value);
    }

    setFilteredPrograms(filtered);
  };

  // Get unique countries and majors for dropdowns
  const uniqueCountries = [
    ...new Set(
      JSON.parse(localStorage.getItem("programs") || "[]")
        .map((p) => p.country)
        .filter((c) => c)
    ),
  ];
  const uniqueMajors = [
    ...new Set(
      JSON.parse(localStorage.getItem("programs") || "[]").flatMap((p) => p.major || [])
    ),
  ];

  return (
    <div className={styles.dashboard}>
      <DashboardNavbar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        closeNav={closeNav}
      />
      <DashboardTopBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <main className={styles.mainContent}>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sortSection}>
              <select
                name="age"
                value={sortCriteria.age}
                onChange={handleSortChange}
              >
                <option value="">Age</option>
                <option value="12-14">12-14</option>
                <option value="<|control636|>-18">15-18</option>
                <option value="reset">Reset</option>
              </select>
              <select
                name="gender"
                value={sortCriteria.gender}
                onChange={handleSortChange}
              >
                <option value="">Gender</option>
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="reset">Reset</option>
              </select>
              <select
                name="country"
                value={sortCriteria.country}
                onChange={handleSortChange}
              >
                <option value="">Country</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
                <option value="reset">Reset</option>
              </select>
              <select
                name="major"
                value={sortCriteria.major}
                onChange={handleSortChange}
              >
                <option value="">Major</option>
                {uniqueMajors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
                <option value="reset">Reset</option>
              </select>
              <select
                name="format"
                value={sortCriteria.format}
                onChange={handleSortChange}
              >
                <option value="">Format</option>
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
                <option value="reset">Reset</option>
              </select>
            </div>
            <div className={styles.cards}>
              {filteredPrograms.map((program) => (
                <div key={program.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img src={img} alt={program.title} />
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
                      {program.country || "N/A"}
                    </span>
                    <span className={styles.separator}>|</span>
                    <span className={styles.cardType}>{program.type}</span>
                    <span className={styles.separator}>|</span>
                    <span className={styles.cardDate}>
                      {new Date(program.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={styles.cardDescription}>{program.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;