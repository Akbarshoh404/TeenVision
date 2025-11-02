import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import img from "../../../Components/images/cardexample.png";
import { useNavigate } from "react-router";

const countryCodeMap = {
  USA: "us",
  Canada: "ca",
  UK: "gb",
  Australia: "au",
  Germany: "de",
  France: "fr",
  Global: "gl",
  Switzerland: "ch",
  Japan: "jp",
  "Saudi Arabia": "sa",
  China: "cn",
  Russia: "ru",
  Turkey: "tr",
  "Hong Kong": "hk",
};

const fallbackPrograms = [
  {
    id: 1,
    title: "Google Summer of Code",
    slug: "google-summer-of-code",
    desc: "Global online program introducing students to open source development.",
    link: "https://summerofcode.withgoogle.com/",
    country: "Global",
    format: "online",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Google_Summer_of_Code_logo.svg",
    type: "program",
    funding: "paid",
    start_age: 18,
    end_age: 30,
    gender: "any",
    status: "on",
    created_at: "2025-10-20 09:20:00+00",
    major: [],
  },
  {
    id: 2,
    title: "MITES Summer Program",
    slug: "mites-summer-program",
    desc: "Free six-week residential program at MIT for talented high school students.",
    link: "https://mitesapp.mit.edu/",
    country: "USA",
    format: "in-person",
    photo:
      "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202307/MITES-Classroom.jpg",
    type: "program",
    funding: "full",
    start_age: 16,
    end_age: 18,
    gender: "any",
    status: "on",
    created_at: "2025-10-20 09:20:00+00",
    major: [],
  },
  {
    id: 3,
    title: "Microsoft Imagine Cup",
    slug: "microsoft-imagine-cup",
    desc: "Global student competition for tech innovation.",
    link: "https://imaginecup.microsoft.com/",
    country: "Global",
    format: "online",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/d/d2/Imagine_Cup_logo.png",
    type: "program",
    funding: "paid",
    start_age: 16,
    end_age: 30,
    gender: "any",
    status: "on",
    created_at: "2025-10-20 09:20:00+00",
    major: [],
  },
  {
    id: 4,
    title: "CERN Summer Student Program",
    slug: "cern-summer-student-program",
    desc: "Summer research program at CERN for physics and computing students.",
    link: "https://careers.cern/summer",
    country: "Switzerland",
    format: "in-person",
    photo:
      "https://home.cern/sites/home.web.cern.ch/files/styles/medium/public/image/2016/07/Summer_Students_2016.jpg",
    type: "program",
    funding: "paid",
    start_age: 18,
    end_age: 28,
    gender: "any",
    status: "on",
    created_at: "2025-10-20 09:20:00+00",
    major: [],
  },
  {
    id: 5,
    title: "Rise Global Challenge",
    slug: "rise-global-challenge",
    desc: "Global scholarship and mentorship program for young changemakers.",
    link: "https://www.risefortheworld.org/",
    country: "Global",
    format: "online",
    photo:
      "https://www.schmidtfutures.com/wp-content/uploads/2021/03/rise-logo.png",
    type: "program",
    funding: "full",
    start_age: 15,
    end_age: 17,
    gender: "any",
    status: "on",
    created_at: "2025-10-20 09:20:00+00",
    major: [],
  },
  {
    id: 7,
    title: "NASA Internships and Fellowships",
    slug: "nasa-internships",
    desc: "Hands-on experience at NASA centers for students in STEM.",
    link: "https://intern.nasa.gov/",
    country: "USA",
    format: "in-person",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
    type: "program",
    funding: "paid",
    start_age: 18,
    end_age: 25,
    gender: "any",
    status: "on",
    created_at: "2025-10-20 09:20:00+00",
    major: [],
  },
];

const HomeSection3 = () => {
  const navigate = useNavigate();
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

        let items = programData
          .filter((p) => p.type === "program" && p.status === "on")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);

        // Fallback if API fails or returns less than 6
        if (items.length < 6) {
          const fallback = fallbackPrograms.slice(0, 6 - items.length);
          items = [...items, ...fallback];
        }

        items = items.map((p) => ({
          ...p,
          photo: p.photo || img,
          date: p.created_at,
        }));

        setMajors(majorsData.results || []);
        setPrograms(items);
      } catch (e) {
        console.error(e);
        // Use fallback on complete failure
        const fallback = fallbackPrograms.map((p) => ({
          ...p,
          photo: p.photo || img,
          date: p.created_at,
        }));
        setPrograms(fallback);
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
    <section id="programs" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>
            <span>Latest</span> Programs
          </h2>
          <button
            className={styles.seeMoreButton}
            onClick={() => {
            navigate("/register");
            }}
          >
            See More
          </button>
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
