import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [majorsMap, setMajorsMap] = useState({});

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(
          "https://teenvision-1.onrender.com/api/v1/programs/"
        );
        const data = await res.json();
        // Normalize and take latest items; fall back to placeholder image
        const items = (data.results || [])
          .filter((p) => p.type === "program")
          .slice(0, 6)
          .map((p) => ({
            ...p,
            photo: p.photo || img,
            date: p.created_at,
          }));
        setPrograms(items);
      } catch (e) {
        // On failure, keep empty list; UI can remain minimal
        setPrograms([]);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await fetch(
          "https://teenvision-1.onrender.com/api/v1/majors/"
        );
        const data = await res.json();
        const map = {};
        (data.results || []).forEach((m) => {
          map[m.id] = m.name;
        });
        setMajorsMap(map);
      } catch (_) {
        setMajorsMap({});
      }
    };
    fetchMajors();
  }, []);

  const goToPrograms = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    navigate(isAuthenticated ? "/dashboard/home" : "/login");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>
            <span>Latest</span> Programs
          </p>
          <button className={styles.seeMoreButton} onClick={goToPrograms}>See More</button>
        </div>

        <div className={styles.cards}>
          {programs.map((program) => (
            <div key={program.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img
                  src={program.photo}
                  alt={program.title}
                  onError={(e) => {
                    e.currentTarget.src = img;
                  }}
                />
              </div>
              <div className={styles.cardMajors}>
                {(program.major || []).map((majorIdOrName, index) => {
                  const isId =
                    typeof majorIdOrName === "number" ||
                    /^(\d+)$/.test(String(majorIdOrName));
                  const name = isId
                    ? majorsMap[Number(majorIdOrName)] || String(majorIdOrName)
                    : String(majorIdOrName);
                  return (
                    <span key={index} className={styles.majorButton}>
                      {name}
                    </span>
                  );
                })}
              </div>
              <h3 className={styles.cardTitle}>{program.title}</h3>
              <div className={styles.cardInfoRow}>
                <span className={styles.cardCountry}>{program.country}</span>
                <span className={styles.separator}>|</span>
                <span className={styles.cardType}>{program.type}</span>
                <span className={styles.separator}>|</span>
                <span className={styles.cardDate}>{program.date}</span>
              </div>
              <p className={styles.cardDescription}>{program.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection3;
