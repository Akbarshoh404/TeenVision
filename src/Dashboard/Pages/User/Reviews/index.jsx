import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";
import programImg from "../../../../Components/images/program sample.png";
import tutorialImg from "../../../../Components/images/tutorial sample.png";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const DashboardReviews = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    start_age: "",
    end_age: "",
    gender: "",
    country: "",
    major: "",
    format: "",
    type: "",
  });
  const [likedItems, setLikedItems] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const storedLikedPrograms = JSON.parse(
      localStorage.getItem("liked_programs") || "[]"
    );
    const storedLikedTutorials = JSON.parse(
      localStorage.getItem("liked_tutorials") || "[]"
    );
    return {
      programs:
        (user.liked_programs && user.liked_programs.length > 0
          ? user.liked_programs
          : storedLikedPrograms) || [],
      tutorials:
        (user.liked_tutorials && user.liked_tutorials.length > 0
          ? user.liked_tutorials
          : storedLikedTutorials) || [],
    };
  });
  const [majors, setMajors] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch(
          "https://teenvision-1.onrender.com/api/v1/majors/"
        );
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

    const fetchLikedItems = async () => {
      let storedPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
      let storedTutorials = JSON.parse(localStorage.getItem("tutorials") || "[]");

      // Fallback: if local caches are empty (e.g., after re-login), fetch them
      try {
        if (!Array.isArray(storedPrograms) || storedPrograms.length === 0) {
          const resPrograms = await fetch(
            "https://teenvision-1.onrender.com/api/v1/programs/"
          );
          const dataPrograms = await resPrograms.json();
          storedPrograms = (dataPrograms.results || []).filter(
            (p) => p.type === "program"
          );
          localStorage.setItem("programs", JSON.stringify(storedPrograms));
        }
        if (!Array.isArray(storedTutorials) || storedTutorials.length === 0) {
          const resTutorials = await fetch(
            "https://teenvision-1.onrender.com/api/v1/programs/tutorials/"
          );
          const dataTutorials = await resTutorials.json();
          storedTutorials = dataTutorials.results || [];
          localStorage.setItem("tutorials", JSON.stringify(storedTutorials));
        }
      } catch (e) {
        console.error("Failed to refresh caches for reviews:", e);
      }
      const allItems = [
        ...storedPrograms.map((item) => ({ ...item, itemType: "program" })),
        ...storedTutorials.map((item) => ({ ...item, itemType: "tutorial" })),
      ];

      const liked = allItems
        .filter((item) =>
          item.itemType === "program"
            ? likedItems.programs.includes(item.id)
            : likedItems.tutorials.includes(item.id)
        )
        .map((item) => ({
          ...item,
          photo:
            item.photo ||
            (item.itemType === "tutorial" ? tutorialImg : programImg),
          desc: item.desc || "No description available",
          date: item.created_at,
          type: item.itemType,
          major: item.major || [],
          gender:
            item.gender === "any"
              ? "All"
              : item.gender
              ? item.gender.charAt(0).toUpperCase() + item.gender.slice(1)
              : "Unknown",
          format: item.format
            ? item.format.charAt(0).toUpperCase() + item.format.slice(1)
            : "Unknown",
        }));

      let filtered = [...liked];

      if (sortCriteria.start_age) {
        filtered = filtered.filter(
          (p) => !p.start_age || p.start_age >= parseInt(sortCriteria.start_age)
        );
      }
      if (sortCriteria.end_age) {
        filtered = filtered.filter(
          (p) => !p.end_age || p.end_age <= parseInt(sortCriteria.end_age)
        );
      }
      if (sortCriteria.gender) {
        filtered = filtered.filter(
          (p) => p.gender === sortCriteria.gender || p.gender === "All"
        );
      }
      if (sortCriteria.country) {
        filtered = filtered.filter((p) => p.country === sortCriteria.country);
      }
      if (sortCriteria.major) {
        filtered = filtered.filter((p) =>
          p.major.includes(parseInt(sortCriteria.major))
        );
      }
      if (sortCriteria.format) {
        filtered = filtered.filter((p) => p.format === sortCriteria.format);
      }
      if (sortCriteria.type) {
        filtered = filtered.filter((p) => p.type === sortCriteria.type);
      }

      setFilteredItems(filtered);
    };

    fetchMajors();
    fetchLikedItems();
  }, [likedItems, sortCriteria]);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortCriteria((prev) => ({ ...prev, [name]: value }));

    if (value === "reset") {
      setSortCriteria({
        start_age: "",
        end_age: "",
        gender: "",
        country: "",
        major: "",
        format: "",
        type: "",
      });
    }
  };

  const handleLike = async (itemId, slug, itemType) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      await axios.post(
        `https://teenvision-1.onrender.com/api/v1/programs/${slug}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let updatedLikedPrograms = likedItems.programs;
      let updatedLikedTutorials = likedItems.tutorials;

      if (itemType === "program") {
        updatedLikedPrograms = likedItems.programs.includes(itemId)
          ? likedItems.programs.filter((id) => id !== itemId)
          : [...new Set([...likedItems.programs, itemId])];
      } else if (itemType === "tutorial") {
        updatedLikedTutorials = likedItems.tutorials.includes(itemId)
          ? likedItems.tutorials.filter((id) => id !== itemId)
          : [...new Set([...likedItems.tutorials, itemId])];
      }

      setLikedItems((prev) => ({
        ...prev,
        programs: updatedLikedPrograms,
        tutorials: updatedLikedTutorials,
      }));
      localStorage.setItem(
        "liked_programs",
        JSON.stringify(updatedLikedPrograms)
      );
      localStorage.setItem(
        "liked_tutorials",
        JSON.stringify(updatedLikedTutorials)
      );

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      // Persist likes into user object for future sessions regardless of user id
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          liked_programs: updatedLikedPrograms,
          liked_tutorials: updatedLikedTutorials,
        })
      );
    } catch (error) {
      console.error(`Error liking/unliking ${itemType}:`, error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
      } else if (error.response?.status === 403) {
        alert("You don't have permission to perform this action.");
      } else {
        alert(`Failed to like/unlike ${itemType}. Please try again.`);
      }
    }
  };

  const transitions = useTransition(filteredItems, {
    keys: (item) => item.id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 300 },
  });

  const uniqueCountries = [
    ...new Set(
      [
        ...JSON.parse(localStorage.getItem("programs") || "[]"),
        ...JSON.parse(localStorage.getItem("tutorials") || "[]"),
      ]
        .map((p) => p.country)
        .filter((c) => c)
    ),
  ];
  const uniqueMajors = [
    ...new Set(
      [
        ...JSON.parse(localStorage.getItem("programs") || "[]"),
        ...JSON.parse(localStorage.getItem("tutorials") || "[]"),
      ].flatMap((p) => p.major || [])
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
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>
                Liked Programs and Tutorials
              </h2>
            </div>
            {(likedItems.programs.length > 0 ||
              likedItems.tutorials.length > 0) && (
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
                <select
                  name="type"
                  value={sortCriteria.type}
                  onChange={handleSortChange}
                >
                  <option value="">Type</option>
                  <option value="program">Program</option>
                  <option value="tutorial">Tutorial</option>
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
              </div>
            )}
            {filteredItems.length > 0 ? (
              <div className={styles.cards}>
                {transitions((style, item) => (
                  <Link
                    to={`/dashboard/${item.itemType}/${item.slug}`}
                    key={item.id}
                    className={styles.cardLink}
                  >
                    <animated.div style={style} className={styles.card}>
                      <div className={styles.cardImage}>
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.title}
                            onError={(e) => {
                              e.target.src =
                                item.itemType === "tutorial"
                                  ? tutorialImg
                                  : programImg;
                            }}
                          />
                        ) : (
                          <div className={styles.placeholderImage}>
                            {item.title.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <button
                          className={`${styles.likeIcon} ${
                            (item.itemType === "program"
                              ? likedItems.programs
                              : likedItems.tutorials
                            ).includes(item.id)
                              ? styles.liked
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(item.id, item.slug, item.itemType);
                          }}
                        >
                          {(item.itemType === "program"
                            ? likedItems.programs
                            : likedItems.tutorials
                          ).includes(item.id) ? (
                            <AiFillHeart size={24} />
                          ) : (
                            <AiOutlineHeart size={24} />
                          )}
                        </button>
                      </div>
                      <div className={styles.cardMajors}>
                        {item.major.length > 0 ? (
                          item.major.map((majorId, index) => {
                            const majorName = majors[majorId];
                            const majorClassKey =
                              typeof majorName === "string"
                                ? `${majorName.toLowerCase()}Major`
                                : "";
                            return (
                              <span
                                key={index}
                                className={`${styles.majorButton} ${
                                  styles[majorClassKey] || ""
                                }`}
                              >
                                {typeof majorName === "string" ? majorName : String(majorId)}
                              </span>
                            );
                          })
                        ) : (
                          <span className={styles.majorButton}>No Majors</span>
                        )}
                      </div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <div className={styles.cardInfoRow}>
                        {item.country && (
                          <>
                            <span className={styles.cardCountry}>
                              {item.country || "N/A"}
                            </span>
                            <span className={styles.separator}>|</span>
                          </>
                        )}
                        <span className={styles.cardType}>{item.type}</span>
                        {item.date && (
                          <>
                            <span className={styles.separator}>|</span>
                            <span className={styles.cardDate}>
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                      <p className={styles.cardDescription}>{item.desc}</p>
                    </animated.div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.noPrograms}>
                {likedItems.programs.length > 0 ||
                likedItems.tutorials.length > 0
                  ? "No matching programs or tutorials"
                  : "No liked programs or tutorials yet"}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardReviews;
