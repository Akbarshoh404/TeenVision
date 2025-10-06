import React from "react";
import styles from "./style.module.scss";
import img from "../../../Components/images/cardexample.png";

const Programs = [
  {
    id: "1",
    title: "Summer Coding Bootcamp",
    desc: "Learn coding with hands-on projects in a fun setting.",
    fullInfo:
      "This intensive bootcamp covers Python, JavaScript, and web development basics.",
    date: "2025-06-01",
    deadline: "2025-05-15",
    link: "https://example.com/coding-bootcamp",
    country: "USA",
    format: "In-person",
    photo: img,
    type: "Workshop",
    funding: "Partial",
    start_age: 12,
    end_age: 18,
    gender: "All",
    major: ["CS"],
  },
  {
    id: "2",
    title: "Math Olympiad Prep",
    desc: "Train for math competitions with expert coaching.",
    fullInfo:
      "Focuses on advanced problem-solving techniques and competition strategies.",
    date: "2025-07-10",
    deadline: "2025-06-20",
    link: "https://example.com/math-olympiad",
    country: "Canada",
    format: "Online",
    photo: img,
    type: "Training",
    funding: "Full",
    start_age: 14,
    end_age: 18,
    gender: "All",
    major: ["Math"],
  },
  {
    id: "3",
    title: "Science Research Internship",
    desc: "Conduct research with scientists in top labs.",
    fullInfo: "Participants conduct experiments in biology and chemistry labs.",
    date: "2025-06-15",
    deadline: "2025-05-30",
    link: "https://example.com/science-internship",
    country: "UK",
    format: "In-person",
    photo: img,
    type: "Internship",
    funding: "None",
    start_age: 16,
    end_age: 18,
    gender: "All",
    major: ["Science"],
  },
  {
    id: "4",
    title: "AI & Machine Learning Workshop",
    desc: "Build AI models and explore ML concepts.",
    fullInfo:
      "Covers neural networks, data processing, and real-world AI applications.",
    date: "2025-08-01",
    deadline: "2025-07-15",
    link: "https://example.com/ai-workshop",
    country: "Australia",
    format: "Hybrid",
    photo: img,
    type: "Workshop",
    funding: "Partial",
    start_age: 15,
    end_age: 18,
    gender: "All",
    major: ["CS"],
  },
  {
    id: "5",
    title: "Robotics Summer Camp",
    desc: "Design and program robots in teams.",
    fullInfo: "Learn about sensors, actuators, and robot control systems.",
    date: "2025-07-05",
    deadline: "2025-06-10",
    link: "https://example.com/robotics-camp",
    country: "Germany",
    format: "In-person",
    photo: img,
    type: "Camp",
    funding: "Full",
    start_age: 13,
    end_age: 18,
    gender: "All",
    major: ["CS", "Science"],
  },
  {
    id: "6",
    title: "Advanced Calculus Program",
    desc: "Master calculus for aspiring mathematicians.",
    fullInfo: "Covers multivariable calculus and differential equations.",
    date: "2025-06-20",
    deadline: "2025-06-01",
    link: "https://example.com/calculus-program",
    country: "France",
    format: "Online",
    photo: img,
    type: "Course",
    funding: "None",
    start_age: 15,
    end_age: 18,
    gender: "All",
    major: ["Math"],
  },
];

const countryCodeMap = {
  USA: "us",
  Canada: "ca",
  UK: "gb",
  Australia: "au",
  Germany: "de",
  France: "fr",
};

const HomeSection3 = () => {
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
          {Programs.map((program) => (
            <div key={program.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={program.photo} alt={program.title} />
              </div>
              <div className={styles.cardMajors}>
                {program.major.map((major, index) => (
                  <span
                    key={index}
                    className={`${styles.majorButton} ${
                      styles[major.toLowerCase() + "Major"]
                    }`}
                  >
                    {major}
                  </span>
                ))}
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
