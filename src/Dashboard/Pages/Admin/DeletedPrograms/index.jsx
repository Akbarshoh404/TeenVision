import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";
import img from "../../../../Components/images/cardexample.png";

const DashboardAdminDeletedPrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
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
        const majorsRes = await fetch("http://127.0.0.1:8000/api/v1/majors/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!majorsRes.ok) {
          if (majorsRes.status === 401) {
            setError("Unauthorized. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
          throw new Error(`Failed to fetch majors (${majorsRes.status})`);
        }

        const majorsData = await majorsRes.json();
        setMajors(majorsData.results || []);

        // Fetch deleted programs (status=off)
        const programsRes = await fetch(
          "http://127.0.0.1:8000/api/v1/programs/?status=off",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!programsRes.ok) {
          if (programsRes.status === 401) {
            setError("Unauthorized. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
          const errorText = await programsRes.text();
          throw new Error(
            `Failed to fetch deleted programs: ${programsRes.status} ${errorText}`
          );
        }

        const programsData = await programsRes.json();
        const deletedPrograms = programsData.results || [];
        setPrograms(deletedPrograms);
        localStorage.setItem(
          "deletedPrograms",
          JSON.stringify(deletedPrograms)
        );
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        // Fallback to localStorage
        const stored =
          JSON.parse(localStorage.getItem("deletedPrograms")) || [];
        setPrograms(stored);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Removed navigate from dependency array

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);

  const getMajorNames = (majorIds) => {
    if (!Array.isArray(majorIds)) return [];
    return majorIds
      .map((id) => majors.find((m) => m.id === id)?.name)
      .filter(Boolean);
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
              <h2 className={styles.sectionTitle}>
                Loading Deleted Programs...
              </h2>
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
            <h2 className={styles.sectionTitle}>Deleted Programs</h2>
            {error && <p className={styles.error}>{error}</p>}
            {programs.length === 0 ? (
              <p className={styles.noPrograms}>
                No deleted programs available.
              </p>
            ) : (
              <div className={styles.cards}>
                {programs.map((program) => (
                  <div
                    key={program.slug || program.id}
                    className={styles.card}
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/deleted-programs/${program.slug}`
                      )
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
                          `/dashboard/admin/deleted-programs/${program.slug}`
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

export default DashboardAdminDeletedPrograms;
