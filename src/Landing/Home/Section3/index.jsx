import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import img from "../../../Components/images/cardexample.png";

const countryCodeMap = {
  USA: "us",
  Canada: "ca",
  UK: "gb",
  Australia: "au",
  Germany: "de",
  France: "fr",
};

const HomeSection3 = () => {
  const [programs, setPrograms] = useState([]);
  const [majors, setMajors] = useState([]);

  const fetchAllPages = async (url, accumulatedItems = []) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      const newItems = data.results || [];
      const allItems = [...accumulatedItems, ...newItems];
      if (data.next) {
        return fetchAllPages(data.next, allItems);
      }
      return allItems;
    } catch (e) {
      console.error(e);
      return accumulatedItems;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programData, majorsData] = await Promise.all([
          fetchAllPages("https://teenvision-1.onrender.com/api/v1/programs/"),
          fetch("https://teenvision-1.onrender.com/api/v1/majors/").then(
            async (res) => {
              if (!res.ok)
                throw new Error(`Majors fetch failed: ${res.status}`);
              return res.json();
            }
          ),
        ]);

        const items = programData
          .filter((p) => p.type === "program" && p.status === "on")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6)
          .map((p) => ({
            ...p,
            photo: p.photo || img,
            date: p.created_at,
          }));

        setMajors(majorsData.results || []);
        setPrograms(items);
      } catch (e) {
        console.error(e);
        setPrograms([]);
        setMajors([]);
      }
    };
    fetchData();
  }, []);

  const getMajorName = (majorId) => {
    const major = majors.find((m) => m.id === majorId);
    return major ? major.name : "Unknown";
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>
            <span>Latest</span> Programs
          </p>
          <button className={styles.seeMoreButton}>See More</button>
        </div>

        <div className={styles.cards}>
          {programs.length === 0 ? (
            <p className={styles.noPrograms}>No programs available.</p>
          ) : (
            programs.map((program) => (
              <div key={program.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <img
                    src={program.photo}
                    alt={program.title}
                    onError={(e) => (e.target.src = img)}
                  />
                </div>
                <div className={styles.cardMajors}>
                  {(program.major || []).length > 0 ? (
                    program.major.map((majorId, index) => {
                      const majorName = getMajorName(majorId);
                      return (
                        <span
                          key={index}
                          className={`${styles.majorButton} ${
                            styles[`${majorName.toLowerCase()}Major`] || ""
                          }`}
                        >
                          {majorName}
                        </span>
                      );
                    })
                  ) : (
                    <span className={styles.majorButton}>No Majors</span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>
                  {program.title || "Untitled"}
                </h3>
                <div className={styles.cardInfoRow}>
                  <span className={styles.cardCountry}>
                    {countryCodeMap[program.country] && (
                      <img
                        src={`https://flagcdn.com/16x12/${
                          countryCodeMap[program.country]
                        }.png`}
                        alt={`${program.country} flag`}
                        className={styles.countryFlag}
                      />
                    )}
                    {program.country || "Unknown"}
                  </span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.cardType}>
                    {program.type.charAt(0).toUpperCase() +
                      program.type.slice(1) || "Unknown"}
                  </span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.cardDate}>
                    {program.date
                      ? new Date(program.date).toLocaleDateString()
                      : "Unknown Date"}
                  </span>
                </div>
                <p className={styles.cardDescription}>
                  {program.desc || "No description available."}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeSection3;
