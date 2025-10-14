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
    return {
      programs: user.liked_programs || [],
      tutorials: user.liked_tutorials || [],
      majors: user.liked_majors || [],
    };
  });
  const [majors, setMajors] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [viewMode, setViewMode] = useState("programs");

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

    const fetchLikedItems = () => {
      if (viewMode === "programs") {
        const storedPrograms = JSON.parse(
          localStorage.getItem("programs") || "[]"
        );
        const storedTutorials = JSON.parse(
          localStorage.getItem("tutorials") || "[]"
        );
        const allItems = [...storedPrograms, ...storedTutorials];

        const liked = allItems
          .filter((item) =>
            item.type === "program"
              ? likedItems.programs.includes(item.id)
              : likedItems.tutorials.includes(item.id)
          )
          .map((item) => ({
            ...item,
            photo:
              item.photo ||
              (item.type === "tutorial" ? tutorialImg : programImg),
            desc: item.desc || "No description available",
            date: item.created_at,
            type: item.type || "program",
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
            itemType: item.type,
          }));

        setFilteredItems(liked);
      } else {
        const likedMajors = Object.keys(majors)
          .filter((majorId) => likedItems.majors.includes(parseInt(majorId)))
          .map((majorId) => ({
            id: majorId,
            title: majors[majorId],
            desc: `Explore ${majors[majorId]} opportunities`,
            photo: null,
            date: null,
            type: "major",
            major: [parseInt(majorId)],
            gender: "All",
            format: null,
            itemType: "major",
          }));

        setFilteredItems(likedMajors);
      }
    };

    fetchMajors();
    fetchLikedItems();
  }, [likedItems, viewMode, majors]);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortCriteria((prev) => ({ ...prev, [name]: value }));

    if (viewMode === "programs") {
      const storedPrograms = JSON.parse(
        localStorage.getItem("programs") || "[]"
      );
      const storedTutorials = JSON.parse(
        localStorage.getItem("tutorials") || "[]"
      );
      let allItems = [...storedPrograms, ...storedTutorials];

      let items = allItems
        .filter((item) =>
          item.type === "program"
            ? likedItems.programs.includes(item.id)
            : likedItems.tutorials.includes(item.id)
        )
        .map((item) => ({
          ...item,
          photo:
            item.photo || (item.type === "tutorial" ? tutorialImg : programImg),
          desc: item.desc || "No description available",
          date: item.created_at,
          type: item.type || "program",
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
          itemType: item.type,
        }));

      let filtered = [...items];

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
        setFilteredItems(items);
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
      } else if (name === "type" && value) {
        filtered = filtered.filter((p) => p.type === value);
      }

      setFilteredItems(filtered);
    } else {
      let majorsFiltered = Object.keys(majors)
        .filter((majorId) => likedItems.majors.includes(parseInt(majorId)))
        .map((majorId) => ({
          id: majorId,
          title: majors[majorId],
          desc: `Explore ${majors[majorId]} opportunities`,
          photo: null,
          date: null,
          type: "major",
          major: [parseInt(majorId)],
          gender: "All",
          format: null,
          itemType: "major",
        }));

      let filtered = [...majorsFiltered];

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
        setFilteredItems(majorsFiltered);
        return;
      }

      if (name === "major" && value) {
        filtered = filtered.filter((m) => m.major.includes(parseInt(value)));
      }

      setFilteredItems(filtered);
    }
  };

  const handleLike = async (itemId, slug, itemType) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      if (itemType === "program" || itemType === "tutorial") {
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
        let updatedLikedTutorials;
        if (itemType === "program") {
          updatedLikedPrograms = likedItems.programs.includes(itemId)
            ? likedItems.programs.filter((id) => id !== itemId)
            : [...new Set([...likedItems.programs, itemId])];
          updatedLikedTutorials = likedItems.tutorials;
        } else {
          updatedLikedTutorials = likedItems.tutorials.includes(itemId)
            ? likedItems.tutorials.filter((id) => id !== itemId)
            : [...new Set([...likedItems.tutorials, itemId])];
          updatedLikedPrograms = likedItems.programs;
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
        if (user.id) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              liked_programs: updatedLikedPrograms,
              liked_tutorials: updatedLikedTutorials,
            })
          );
        }
      } else if (itemType === "major") {
        let updatedLikedMajors = likedItems.majors.includes(itemId)
          ? likedItems.majors.filter((id) => id !== itemId)
          : [...new Set([...likedItems.majors, itemId])];

        setLikedItems((prev) => ({
          ...prev,
          majors: updatedLikedMajors,
        }));
        localStorage.setItem(
          "liked_majors",
          JSON.stringify(updatedLikedMajors)
        );

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.id) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              liked_majors: updatedLikedMajors,
            })
          );
        }
      }
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

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "programs" ? "majors" : "programs"));
    setSortCriteria({
      start_age: "",
      end_age: "",
      gender: "",
      country: "",
      major: "",
      format: "",
      type: "",
    });
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
                Liked{" "}
                {viewMode === "programs" ? "Programs and Tutorials" : "Majors"}
              </h2>
              <button className={styles.toggleButton} onClick={toggleViewMode}>
                Switch to {viewMode === "programs" ? "Majors" : "Programs"}
              </button>
            </div>
            {(likedItems.programs.length > 0 ||
              likedItems.tutorials.length > 0 ||
              likedItems.majors.length > 0) && (
              <div className={styles.sortSection}>
                {viewMode === "programs" && (
                  <>
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
                  </>
                )}
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
                    to={
                      item.itemType === "major"
                        ? `/dashboard/major/${item.id}`
                        : `/dashboard/${item.type}/${item.slug}`
                    }
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
                                item.type === "tutorial"
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
                              : item.itemType === "tutorial"
                              ? likedItems.tutorials
                              : likedItems.majors
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
                            : item.itemType === "tutorial"
                            ? likedItems.tutorials
                            : likedItems.majors
                          ).includes(item.id) ? (
                            <AiFillHeart size={24} />
                          ) : (
                            <AiOutlineHeart size={24} />
                          )}
                        </button>
                      </div>
                      <div className={styles.cardMajors}>
                        {item.major.length > 0 ? (
                          item.major.map((majorId, index) => (
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
                {likedItems[viewMode].length > 0
                  ? `No matching ${viewMode}`
                  : `No liked ${viewMode} yet`}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardReviews;
