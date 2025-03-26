import React from "react";
import styles from "./style.module.scss";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import img from "../../../Components/images/cardexample.png";

const teamMembers = [
  {
    id: 1,
    image: img, // Updated to rectangular placeholder
    name: "John Doe",
    responsibility: "Lead Developer",
    description:
      "John leads our tech team with innovative solutions and expertise in modern web technologies.",
    social: {
      instagram: "https://instagram.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },
  {
    id: 2,
    image: img,
    name: "Jane Smith",
    responsibility: "UI/UX Designer",
    description:
      "Jane crafts intuitive and beautiful designs that enhance user experiences.",
    social: {
      instagram: "https://instagram.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  },
  {
    id: 3,
    image: img,
    name: "Alex Johnson",
    responsibility: "Project Manager",
    description:
      "Alex ensures projects run smoothly and deadlines are met with precision.",
    social: {
      instagram: "https://instagram.com/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
    },
  },
];

const HomeSection2 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>TeenVision Team</h2>

          <div className={styles.cards}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className={styles.cardName}>{member.name}</h3>
                <p className={styles.cardResponsibility}>
                  {member.responsibility}
                </p>
                <p className={styles.cardDescription}>{member.description}</p>
                <div className={styles.socialLinks}>
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSection2;
