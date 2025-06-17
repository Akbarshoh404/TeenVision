import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";
import img from "../../../../Components/images/cardexample.png";

const DashboardHome = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    start_age: "",
    end_age: "",
    gender: "",
    country: "",
    major: "",
    format: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [majors, setMajors] = useState({}); // Store major ID to name mapping

  // Fetch programs and majors from API
  useEffect(() => {
    // Fetch programs
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/programs/");
        const data = await response.json();
        const programs = data.results || [];

        // Normalize program data
        const normalizedPrograms = programs.map((program) => ({
          ...program,
          photo: program.photo || img,
          desc: program.desc || "No description available",
          date: program.created_at,
          type: program.type || "Program",
          major: program.major || [],
          gender:
            program.gender === "any"
              ? "All"
              : program.gender.charAt(0).toUpperCase() +
                program.gender.slice(1),
          format: program.format
            ? program.format.charAt(0).toUpperCase() + program.format.slice(1)
            : "Unknown",
        }));

        // Store in localStorage
        localStorage.setItem("programs", JSON.stringify(programs));
        setFilteredPrograms(normalizedPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    // Fetch majors
    const fetchMajors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/majors/");
        const data = await response.json();
        const majorMap = {};
        data.results.forEach((major) => {
          majorMap[major.id] = major.name;
        });
        setMajors(majorMap);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };

    fetchPrograms();
    fetchMajors();
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
      gender:
        program.gender === "any"
          ? "All"
          : program.gender.charAt(0).toUpperCase() + program.gender.slice(1),
      format: program.format
        ? program.format.charAt(0).toUpperCase() + program.format.slice(1)
        : "Unknown",
    }));

    let filtered = [...programs];

    if (value === "reset") {
      setSortCriteria({
        start_age: "",
        end_age: "",
        gender: "",
        country: "",
        major: "",
        format: "",
      });
      setFilteredPrograms(programs);
      return;
    }

    if (name === "start_age" && value) {
      filtered = filtered.filter(
        (p) => !p.start_age || p.start_age >= parseInt(value)
      );
    } else if (name === "end_age" && value) {
      filtered = filtered.filter(
        (p) => !p.end_age || p.end_age <= parseInt(value)
      );
    } else if (name === "gender" && value) {
      filtered = filtered.filter(
        (p) => p.gender === value || p.gender === "All"
      );
    } else if (name === "country" && value) {
      filtered = filtered.filter((p) => p.country === value);
    } else if (name === "major" && value) {
      filtered = filtered.filter((p) => p.major.includes(parseInt(value)));
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
      JSON.parse(localStorage.getItem("programs") || "[]").flatMap(
        (p) => p.major || []
      )
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
                name="start_age"
                value={sortCriteria.start_age}
                onChange={handleSortChange}
              >
                <option value="">Start Age</option>
                {[12, 13, 14, 15, 16, 17, 18].map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
                <option value="reset">Reset</option>
              </select>
              <select
                name="end_age"
                value={sortCriteria.end_age}
                onChange={handleSortChange}
              >
                <option value="">End Age</option>
                {[12, 13, 14, 15, 16, 17, 18].map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
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
                {uniqueMajors.map((majorId) => (
                  <option key={majorId} value={majorId}>
                    {majors[majorId] || majorId}
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
                    {program.major.map((majorId, index) => (
                      <span key={index} className={styles.majorButton}>
                        {majors[majorId] || majorId}
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
