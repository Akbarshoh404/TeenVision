import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import PropTypes from "prop-types";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";
import img from "../../../../Components/images/tutorial sample.png";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const DashboardTutorials = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    start_age: "",
    end_age: "",
    gender: "",
    country: "",
    major: "",
    format: "",
  });
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [majors, setMajors] = useState({});
  const [likedTutorials, setLikedTutorials] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.liked_tutorials || [];
  });

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch(
          "https://teenvision-1.onrender.com/api/v1/programs/tutorials/"
        );
        const data = await response.json();
        const tutorials = data.results || [];

        const normalizedTutorials = tutorials.map((tutorial) => ({
          ...tutorial,
          photo: tutorial.photo || img,
          desc: tutorial.desc || "No description available",
          date: tutorial.created_at,
          type: tutorial.type || "tutorial",
          major: tutorial.major || [],
          gender:
            tutorial.gender === "any"
              ? "All"
              : tutorial.gender
              ? tutorial.gender.charAt(0).toUpperCase() +
                tutorial.gender.slice(1)
              : "Unknown",
          format: tutorial.format
            ? tutorial.format.charAt(0).toUpperCase() + tutorial.format.slice(1)
            : "Unknown",
        }));

        localStorage.setItem("tutorials", JSON.stringify(tutorials));
        setFilteredTutorials(normalizedTutorials);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

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

    fetchTutorials();
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

    const storedTutorials = JSON.parse(
      localStorage.getItem("tutorials") || "[]"
    );
    let tutorials = storedTutorials.map((tutorial) => ({
      ...tutorial,
      photo: tutorial.photo || img,
      desc: tutorial.desc || "No description available",
      date: tutorial.created_at,
      type: tutorial.type || "tutorial",
      major: tutorial.major || [],
      gender:
        tutorial.gender === "any"
          ? "All"
          : tutorial.gender
          ? tutorial.gender.charAt(0).toUpperCase() + tutorial.gender.slice(1)
          : "Unknown",
      format: tutorial.format
        ? tutorial.format.charAt(0).toUpperCase() + tutorial.format.slice(1)
        : "Unknown",
    }));

    let filtered = [...tutorials];

    if (value === "reset") {
      setSortCriteria({
        start_age: "",
        end_age: "",
        gender: "",
        country: "",
        major: "",
        format: "",
      });
      setFilteredTutorials(tutorials);
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

    setFilteredTutorials(filtered);
  };

  const handleLike = async (tutorialId, slug) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      console.log("Liking tutorial with slug:", slug); // Debug slug
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

      let updatedLikedTutorials;
      if (likedTutorials.includes(tutorialId)) {
        updatedLikedTutorials = likedTutorials.filter(
          (id) => id !== tutorialId
        );
      } else {
        updatedLikedTutorials = [...new Set([...likedTutorials, tutorialId])];
      }

      setLikedTutorials(updatedLikedTutorials);
      localStorage.setItem(
        "liked_tutorials",
        JSON.stringify(updatedLikedTutorials)
      );

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, liked_tutorials: updatedLikedTutorials })
        );
      }
    } catch (error) {
      console.error("Error liking/unliking tutorial:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
      } else if (error.response?.status === 403) {
        alert("You don't have permission to perform this action.");
      } else {
        alert("Failed to like/unlike tutorial. Please try again.");
      }
    }
  };

  const transitions = useTransition(filteredTutorials, {
    keys: (tutorial) => tutorial.id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 300 },
  });

  const uniqueCountries = [
    ...new Set(
      JSON.parse(localStorage.getItem("tutorials") || "[]")
        .map((p) => p.country)
        .filter((c) => c)
    ),
  ];
  const uniqueMajors = [
    ...new Set(
      JSON.parse(localStorage.getItem("tutorials") || "[]").flatMap(
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
              {transitions((style, tutorial) => (
                <Link
                  to={`/dashboard/program/${tutorial.slug}`}
                  key={tutorial.id}
                  className={styles.cardLink}
                >
                  <animated.div style={style} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img
                        src={tutorial.photo}
                        alt={tutorial.title}
                        onError={(e) => {
                          e.target.src = img;
                        }}
                      />
                      <button
                        className={`${styles.likeIcon} ${
                          likedTutorials.includes(tutorial.id)
                            ? styles.liked
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike(tutorial.id, tutorial.slug);
                        }}
                      >
                        {likedTutorials.includes(tutorial.id) ? (
                          <AiFillHeart size={24} />
                        ) : (
                          <AiOutlineHeart size={24} />
                        )}
                      </button>
                    </div>
                    <div className={styles.cardMajors}>
                      {tutorial.major.length > 0 ? (
                        tutorial.major.map((majorId, index) => (
                          <span
                            key={index}
                            className={`${styles.majorButton} ${
                              styles[
                                majors[majorId]?.toLowerCase() + "Major"
                              ] || ""
                            }`}
                          >
                            {majors[majorId] || majorId}
                          </span>
                        ))
                      ) : (
                        <span className={styles.majorButton}>No Majors</span>
                      )}
                    </div>
                    <h3 className={styles.cardTitle}>{tutorial.title}</h3>
                    <div className={styles.cardInfoRow}>
                      {tutorial.country && (
                        <>
                          <span className={styles.cardCountry}>
                            {tutorial.country || "N/A"}
                          </span>
                          <span className={styles.separator}>|</span>
                        </>
                      )}
                      <span className={styles.cardType}>{tutorial.type}</span>
                      {tutorial.date && (
                        <>
                          <span className={styles.separator}>|</span>
                          <span className={styles.cardDate}>
                            {new Date(tutorial.date).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                    <p className={styles.cardDescription}>{tutorial.desc}</p>
                  </animated.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

DashboardTutorials.propTypes = {};

export default DashboardTutorials;
