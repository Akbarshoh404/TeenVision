import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";
import img from "../../../../Components/images/cardexample.png";

const DashboardAdminNewPrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      console.log("NewPrograms Token:", token ? "Found" : "Not found");

      if (!token) {
        setError("No authentication token found. Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      // Fetch majors
      const majorsResponse = await fetch(
        "http://127.0.0.1:8000/api/v1/majors/",
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
        throw new Error(`Failed to fetch majors: ${majorsResponse.status}`);
      }

      const majorsData = await majorsResponse.json();
      setMajors(majorsData.results || []);

      // Fetch programs
      const programsResponse = await fetch(
        "http://127.0.0.1:8000/api/v1/programs/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("NewPrograms API Response Status:", programsResponse.status);
      if (!programsResponse.ok) {
        const errorText = await programsResponse.text();
        console.error("NewPrograms API Error Response:", errorText);
        if (programsResponse.status === 401) {
          setError("Unauthorized. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
        throw new Error(
          `Failed to fetch programs: ${programsResponse.status} ${errorText}`
        );
      }

      const programsData = await programsResponse.json();
      console.log("NewPrograms API Data:", programsData);
      const fetchedPrograms = programsData.results || [];
      localStorage.setItem("programs", JSON.stringify(fetchedPrograms));
      setPrograms(fetchedPrograms);
    } catch (err) {
      console.error("NewPrograms Fetch Error:", err);
      setError(err.message);
      const storedPrograms = JSON.parse(localStorage.getItem("programs")) || [];
      setPrograms(storedPrograms);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Removed navigate from dependency array

  // Sort programs
  const sortedPrograms = [...programs].sort((a, b) => {
    let fieldA, fieldB;
    if (sortBy === "title") {
      fieldA = (a.title || "").toLowerCase();
      fieldB = (b.title || "").toLowerCase();
    } else if (sortBy === "deadline") {
      fieldA = a.deadline || "9999-12-31";
      fieldB = b.deadline || "9999-12-31";
    } else if (sortBy === "country") {
      fieldA = (a.country || "").toLowerCase();
      fieldB = (b.country || "").toLowerCase();
    }
    return sortOrder === "asc"
      ? fieldA < fieldB
        ? -1
        : fieldA > fieldB
        ? 1
        : 0
      : fieldA > fieldB
      ? -1
      : fieldA < fieldB
      ? 1
      : 0;
  });

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const getMajorNames = (majorIds) => {
    if (!Array.isArray(majorIds)) return [];
    return majorIds
      .map((id) => {
        const major = majors.find((m) => m.id === id);
        return major ? major.name : null;
      })
      .filter((name) => name);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
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
              <h2 className={styles.sectionTitle}>Loading Programs...</h2>
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
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>Manage Programs</h2>
              <div className={styles.sortControls}>
                <span className={styles.sortLabel}>Sort by:</span>
                <button
                  className={`${styles.sortButton} ${
                    sortBy === "title" ? styles.active : ""
                  }`}
                  onClick={() => handleSortChange("title")}
                >
                  Title{" "}
                  {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`${styles.sortButton} ${
                    sortBy === "deadline" ? styles.active : ""
                  }`}
                  onClick={() => handleSortChange("deadline")}
                >
                  Deadline{" "}
                  {sortBy === "deadline" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`${styles.sortButton} ${
                    sortBy === "country" ? styles.active : ""
                  }`}
                  onClick={() => handleSortChange("country")}
                >
                  Country{" "}
                  {sortBy === "country" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.addCard}>
                  <button
                    className={styles.addButton}
                    onClick={() =>
                      navigate("/dashboard/admin/new-programs/create")
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              {sortedPrograms.length === 0 ? (
                <p className={styles.noPrograms}>No programs available.</p>
              ) : (
                sortedPrograms.map((program) => (
                  <div
                    key={program.slug || program.id}
                    className={styles.card}
                    onClick={() =>
                      navigate(`/dashboard/admin/new-programs/${program.slug}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.cardImage}>
                      <img
                        src={program.photos?.[0] || program.photo || img}
                        alt={program.title || "Program"}
                        className={styles.photoImage}
                        onError={(e) => (e.target.src = img)}
                      />
                    </div>
                    <div className={styles.cardMajors}>
                      {getMajorNames(program.major).map((majorName, index) => (
                        <span key={index} className={styles.majorButton}>
                          {majorName}
                        </span>
                      ))}
                    </div>
                    <h3 className={styles.cardTitle}>
                      {program.title || "Untitled"}
                    </h3>
                    <div className={styles.cardInfoRow}>
                      <span className={styles.cardCountry}>
                        {program.country || "Unknown"}
                      </span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.cardType}>
                        {program.type || "Unknown"}
                      </span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.cardDate}>
                        {program.deadline || "No Deadline"}
                      </span>
                    </div>
                    <p className={styles.cardDescription}>
                      {program.desc || "No description available."}
                    </p>
                    <button
                      className={styles.editButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/dashboard/admin/new-programs/${program.slug}`
                        );
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdminNewPrograms;
