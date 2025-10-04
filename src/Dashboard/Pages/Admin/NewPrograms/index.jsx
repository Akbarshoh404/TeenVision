import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";
import programImg from "../../../../Components/images/program sample.png";
import tutorialImg from "../../../../Components/images/tutorial sample.png";

const DashboardAdminNewPrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    start_age: "",
    end_age: "",
    gender: "",
    country: "",
    major: "",
    format: "",
    type: "",
    funding: "",
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error(
          "No authentication token found. Redirecting to login..."
        );
      }

      const [majorsResponse, programsResponse, tutorialsResponse] =
        await Promise.all([
          fetch("https://b289d2ea-54ff-4085-8113-53fa6fd9c036-00-1l5nlstizz77u.spock.replit.dev/api/v1/majors/", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          fetch("https://b289d2ea-54ff-4085-8113-53fa6fd9c036-00-1l5nlstizz77u.spock.replit.dev/api/v1/programs/", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          fetch("https://b289d2ea-54ff-4085-8113-53fa6fd9c036-00-1l5nlstizz77u.spock.replit.dev/api/v1/programs/tutorials/", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
        ]);

      if (!majorsResponse.ok || !programsResponse.ok || !tutorialsResponse.ok) {
        if (
          majorsResponse.status === 401 ||
          programsResponse.status === 401 ||
          tutorialsResponse.status === 401
        ) {
          throw new Error("Unauthorized. Redirecting to login...");
        }
        throw new Error(
          `Failed to fetch data: Majors ${majorsResponse.status}, Programs ${programsResponse.status}, Tutorials ${tutorialsResponse.status}`
        );
      }

      const [majorsData, programsData, tutorialsData] = await Promise.all([
        majorsResponse.json(),
        programsResponse.json(),
        tutorialsResponse.json(),
      ]);

      const programItems = (programsData.results || []).map((item) => ({
        ...item,
        type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
      }));
      const tutorialItems = (tutorialsData.results || []).map((item) => ({
        ...item,
        type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
      }));
      const uniqueItems = [
        ...programItems,
        ...tutorialItems.filter(
          (t) => !programItems.some((p) => p.slug === t.slug)
        ),
      ];

      setMajors(majorsData.results || []);
      setAllItems(uniqueItems);
      setItems(uniqueItems);
      localStorage.setItem("programs", JSON.stringify(uniqueItems));
    } catch (err) {
      setError(err.message);
      const storedItems = JSON.parse(localStorage.getItem("programs") || "[]");
      setAllItems(storedItems);
      setItems(storedItems);
      if (
        err.message.includes("Unauthorized") ||
        err.message.includes("token")
      ) {
        setTimeout(() => navigate("/login"), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(
    async (item, e) => {
      e.stopPropagation();
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const formData = new FormData();
        formData.append("status", "off");

        const response = await fetch(
          `https://b289d2ea-54ff-4085-8113-53fa6fd9c036-00-1l5nlstizz77u.spock.replit.dev/api/v1/programs/${item.slug}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to delete ${item.type.toLowerCase()}: ${response.status}`
          );
        }

        const updatedItems = items.filter((i) => i.slug !== item.slug);
        const updatedAllItems = allItems.filter((i) => i.slug !== item.slug);
        setItems(updatedItems);
        setAllItems(updatedAllItems);
        localStorage.setItem("programs", JSON.stringify(updatedAllItems));
      } catch (err) {
        setError(err.message);
      }
    },
    [items, allItems]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const handleSortChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setSortCriteria((prev) => {
        const newCriteria = { ...prev, [name]: value };
        if (value === "reset") {
          setItems(allItems);
          return {
            start_age: "",
            end_age: "",
            gender: "",
            country: "",
            major: "",
            format: "",
            type: "",
            funding: "",
          };
        }

        let filtered = [...allItems];
        if (newCriteria.start_age) {
          filtered = filtered.filter(
            (p) =>
              !p.start_age || p.start_age >= parseInt(newCriteria.start_age)
          );
        }
        if (newCriteria.end_age) {
          filtered = filtered.filter(
            (p) => !p.end_age || p.end_age <= parseInt(newCriteria.end_age)
          );
        }
        if (newCriteria.gender) {
          filtered = filtered.filter(
            (p) => p.gender === newCriteria.gender || p.gender === "any"
          );
        }
        if (newCriteria.country) {
          filtered = filtered.filter((p) => p.country === newCriteria.country);
        }
        if (newCriteria.major) {
          filtered = filtered.filter((p) =>
            p.major?.includes(parseInt(newCriteria.major))
          );
        }
        if (newCriteria.format) {
          filtered = filtered.filter((p) => p.format === newCriteria.format);
        }
        if (newCriteria.type) {
          filtered = filtered.filter((p) => p.type === newCriteria.type);
        }
        if (newCriteria.funding) {
          filtered = filtered.filter((p) => p.funding === newCriteria.funding);
        }

        setItems(filtered);
        return newCriteria;
      });
    },
    [allItems]
  );

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);

  const getMajorNames = useCallback(
    (majorIds) => {
      if (!Array.isArray(majorIds)) return [];
      return majorIds
        .map((id) => majors.find((m) => m.id === id)?.name)
        .filter(Boolean);
    },
    [majors]
  );

  const { uniqueCountries, uniqueMajors } = useMemo(
    () => ({
      uniqueCountries: [
        ...new Set(allItems.map((p) => p.country).filter(Boolean)),
      ],
      uniqueMajors: [...new Set(allItems.flatMap((p) => p.major || []))],
    }),
    [allItems]
  );

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
                Loading Programs and Tutorials...
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
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>
                Manage Programs and Tutorials
              </h2>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {allItems.length > 0 && (
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
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                      {majors.find((m) => m.id === majorId)?.name || majorId}
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
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="reset">Reset</option>
                </select>
                <select
                  name="type"
                  value={sortCriteria.type}
                  onChange={handleSortChange}
                >
                  <option value="">Type</option>
                  <option value="Program">Program</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="reset">Reset</option>
                </select>
                <select
                  name="funding"
                  value={sortCriteria.funding}
                  onChange={handleSortChange}
                >
                  <option value="">Funding</option>
                  <option value="full">Full</option>
                  <option value="partial">Partial</option>
                  <option value="self">Self</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="reset">Reset</option>
                </select>
              </div>
            )}
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
              {items.length === 0 ? (
                <p className={styles.noPrograms}>
                  {allItems.length > 0
                    ? "No matching programs or tutorials."
                    : "No programs or tutorials available."}
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.slug || item.id}
                    className={styles.card}
                    onClick={() =>
                      navigate(`/dashboard/admin/new-programs/${item.slug}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.cardImage}>
                      <img
                        src={
                          item.photo ||
                          (item.type === "Tutorial" ? tutorialImg : programImg)
                        }
                        alt={item.title || "Item"}
                        className={styles.photoImage}
                        onError={(e) =>
                          (e.target.src =
                            item.type === "Tutorial" ? tutorialImg : programImg)
                        }
                      />
                    </div>
                    <div className={styles.cardMajors}>
                      {getMajorNames(item.major).length > 0 ? (
                        getMajorNames(item.major).map((majorName, index) => (
                          <span key={index} className={styles.majorButton}>
                            {majorName}
                          </span>
                        ))
                      ) : (
                        <span className={styles.majorButton}>No Majors</span>
                      )}
                    </div>
                    <h3 className={styles.cardTitle}>
                      {item.title || "Untitled"}
                    </h3>
                    <div className={styles.cardInfoRow}>
                      <span className={styles.cardCountry}>
                        {item.country || "Unknown"}
                      </span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.cardType}>
                        {item.type || "Unknown"}
                      </span>
                      <span className={styles.separator}>|</span>
                      <span className={styles.cardDate}>
                        {item.deadline
                          ? new Date(item.deadline).toLocaleDateString()
                          : "No Deadline"}
                      </span>
                    </div>
                    <p className={styles.cardDescription}>
                      {item.desc || "No description available."}
                    </p>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.editButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/dashboard/admin/new-programs/${item.slug}`
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={(e) => handleDelete(item, e)}
                      >
                        Delete
                      </button>
                    </div>
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
