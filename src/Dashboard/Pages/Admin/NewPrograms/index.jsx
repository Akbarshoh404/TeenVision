import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";
import img from "../../../../Components/images/cardexample.png";

const DashboardAdminNewPrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
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

        const response = await fetch("http://127.0.0.1:8000/api/v1/programs/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        console.log("NewPrograms API Response Status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("NewPrograms API Error Response:", errorText);
          if (response.status === 401) {
            setError("Unauthorized. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
          throw new Error(
            `Failed to fetch programs: ${response.status} ${errorText}`
          );
        }

        const data = await response.json();
        console.log("NewPrograms API Data:", data);
        const fetchedPrograms = data.results || [];
        localStorage.setItem("programs", JSON.stringify(fetchedPrograms));
        setPrograms(fetchedPrograms);
      } catch (err) {
        console.error("NewPrograms Fetch Error:", err);
        setError(err.message);
        const storedPrograms =
          JSON.parse(localStorage.getItem("programs")) || [];
        setPrograms(storedPrograms);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [navigate]);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

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
            <h2 className={styles.sectionTitle}>Manage Programs</h2>
            {error && <p className={styles.error}>{error}</p>}
            {programs.length === 0 ? (
              <p className={styles.noPrograms}>No programs available.</p>
            ) : (
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
                {programs.map((program) => (
                  <div
                    key={program.slug}
                    className={styles.card}
                    onClick={() =>
                      navigate(`/dashboard/admin/new-programs/${program.slug}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.cardImage}>
                      <img src={program.photo || img} alt={program.title} />
                    </div>
                    <div className={styles.cardMajors}>
                      {Array.isArray(program.major) &&
                        program.major.map((major, index) => (
                          <span key={index} className={styles.majorButton}>
                            {major}
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
