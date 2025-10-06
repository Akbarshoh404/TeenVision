import React, { useState, useEffect, useCallback } from "react";
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
  const [likedPrograms, setLikedPrograms] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.liked_programs || [];
  });
  const [majors, setMajors] = useState({});
  const [filteredPrograms, setFilteredPrograms] = useState([]);

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

    const fetchLikedPrograms = () => {
      const storedPrograms = JSON.parse(
        localStorage.getItem("programs") || "[]"
      );
      const storedTutorials = JSON.parse(
        localStorage.getItem("tutorials") || "[]"
      );
      const allItems = [...storedPrograms, ...storedTutorials];

      const liked = allItems
        .filter((item) => likedPrograms.includes(item.id))
        .map((item) => ({
          ...item,
          photo:
            item.photo || (item.type === "tutorial" ? tutorialImg : programImg),
          desc: item.desc || "No description available",
          date: item.created_at,
          type: item.type || "Program",
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

      setFilteredPrograms(liked);
    };

    fetchMajors();
    fetchLikedPrograms();
  }, [likedPrograms]);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortCriteria((prev) => ({ ...prev, [name]: value }));

    const storedPrograms = JSON.parse(localStorage.getItem("programs") || "[]");
    const storedTutorials = JSON.parse(
      localStorage.getItem("tutorials") || "[]"
    );
    let allItems = [...storedPrograms, ...storedTutorials];

    let programs = allItems
      .filter((item) => likedPrograms.includes(item.id))
      .map((item) => ({
        ...item,
        photo:
          item.photo || (item.type === "tutorial" ? tutorialImg : programImg),
        desc: item.desc || "No description available",
        date: item.created_at,
        type: item.type || "Program",
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

    let filtered = [...programs];

    if (sortCriteria.start_age || (name === "start_age" && value)) {
      const startAge = name === "start_age" ? value : sortCriteria.start_age;
      if (startAge) {
        filtered = filtered.filter(
          (p) => !p.start_age || p.start_age >= parseInt(startAge)
        );
      }
    }
    if (sortCriteria.end_age || (name === "end_age" && value)) {
      const endAge = name === "end_age" ? value : sortCriteria.end_age;
      if (endAge) {
        filtered = filtered.filter(
          (p) => !p.end_age || p.end_age <= parseInt(endAge)
        );
      }
    }
    if (sortCriteria.gender || (name === "gender" && value)) {
      const gender = name === "gender" ? value : sortCriteria.gender;
      if (gender) {
        filtered = filtered.filter(
          (p) => p.gender === gender || p.gender === "All"
        );
      }
    }
    if (sortCriteria.country || (name === "country" && value)) {
      const country = name === "country" ? value : sortCriteria.country;
      if (country) {
        filtered = filtered.filter((p) => p.country === country);
      }
    }
    if (sortCriteria.major || (name === "major" && value)) {
      const major = name === "major" ? value : sortCriteria.major;
      if (major) {
        filtered = filtered.filter((p) => p.major.includes(parseInt(major)));
      }
    }
    if (sortCriteria.format || (name === "format" && value)) {
      const format = name === "format" ? value : sortCriteria.format;
      if (format) {
        filtered = filtered.filter((p) => p.format === format);
      }
    }
    if (sortCriteria.type || (name === "type" && value)) {
      const type = name === "type" ? value : sortCriteria.type;
      if (type) {
        filtered = filtered.filter((p) => p.type === type);
      }
    }

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
      setFilteredPrograms(programs);
      return;
    }

    setFilteredPrograms(filtered);
  };

  const handleLike = async (programId, slug) => {
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

      let updatedLikedPrograms;
      if (likedPrograms.includes(programId)) {
        updatedLikedPrograms = likedPrograms.filter((id) => id !== programId);
      } else {
        updatedLikedPrograms = [...new Set([...likedPrograms, programId])];
      }

      setLikedPrograms(updatedLikedPrograms);
      localStorage.setItem(
        "liked_programs",
        JSON.stringify(updatedLikedPrograms)
      );

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, liked_programs: updatedLikedPrograms })
        );
      }
    } catch (error) {
      console.error("Error liking/unliking program:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
      } else if (error.response?.status === 403) {
        alert("You don't have permission to perform this action.");
      } else {
        alert("Failed to like/unlike program. Please try again.");
      }
    }
  };

  const transitions = useTransition(filteredPrograms, {
    keys: (program) => program.id,
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
            <h2 className={styles.sectionTitle}>
              Liked Programs and Tutorials
            </h2>
            {likedPrograms.length > 0 && (
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
              </div>
            )}
            {filteredPrograms.length > 0 ? (
              <div className={styles.cards}>
                {transitions((style, program) => (
                  <animated.div
                    key={program.id}
                    style={style}
                    className={styles.card}
                  >
                    <div className={styles.cardImage}>
                      <img
                        src={program.photo}
                        alt={program.title}
                        onError={(e) => {
                          e.target.src =
                            program.type === "tutorial"
                              ? tutorialImg
                              : programImg;
                        }}
                      />
                      <button
                        className={`${styles.likeIcon} ${
                          likedPrograms.includes(program.id) ? styles.liked : ""
                        }`}
                        onClick={() => handleLike(program.id, program.slug)}
                      >
                        {likedPrograms.includes(program.id) ? (
                          <AiFillHeart size={24} />
                        ) : (
                          <AiOutlineHeart size={24} />
                        )}
                      </button>
                    </div>
                    <div className={styles.cardMajors}>
                      {program.major.length > 0 ? (
                        program.major.map((majorId, index) => (
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
                  </animated.div>
                ))}
              </div>
            ) : (
              <p className={styles.noPrograms}>
                {likedPrograms.length > 0
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
