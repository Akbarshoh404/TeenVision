import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "./style.module.scss";
import {
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import img from "../../../Components/images/cardexample.png";

import Xurshid from "../../../Components/images/Xurshidbek.jpg";
import Akbarshoh from "../../../Components/images/me.jpg"

const teamMembers = [
  {
    id: 1,
    image: Xurshid,
    name: "Fayzullayev Xurshidbek",
    responsibility: "Co-Founder",
    description:
      "Visionary leader and strategic thinker behind the project. Xurshidbek ensures the team stays focused, organized, and always moving toward success.",
    social: {
      instagram: "https://instagram.com/johndoe",
      telegram: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },
  {
    id: 2,
    image: Akbarshoh,
    name: "Akbarshoh Ismatov",
    responsibility: "Co-Founder, Full-Stack Developer",
    description:
      "Creative mind and full-stack developer responsible for turning ideas into reality. Akbarshoh builds robust systems with clean code and pixel-perfect design.",
    social: {
      instagram: "https://instagram.com/janesmith",
      telegram: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  },
  {
    id: 3,
    image: img,
    name: "Charos Hakimova",
    responsibility: "Designer",
    description:
      "A talented designer with an eye for detail. Charos crafts intuitive user experiences and beautiful visual designs that define our brand identity.",
    social: {
      instagram: "https://instagram.com/janesmith",
      telegram: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  },
  {
    id: 4,
    image: img,
    name: "Bexruz",
    responsibility: "Backend Developer",
    description: "Backend wizard ensuring everything runs smoothly behind the scenes. Bexruz focuses on performance, security, and reliable server-side architecture.",
    social: {
      instagram: "https://instagram.com/janesmith",
      telegram: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  },
];

const HomeSection2 = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(
    window.innerWidth <= 800 ? 1 : 3
  );

  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth <= 800 ? 1 : 3);
      setCurrentIndex(0);
    };

    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalCards = teamMembers.length;
  const maxIndex = totalCards - cardsPerPage;

  const scrollToIndex = useCallback(
    (index) => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const cardWidth = container.offsetWidth / cardsPerPage;
        container.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    },
    [cardsPerPage]
  );

  useEffect(() => {
    scrollToIndex(0);
  }, [scrollToIndex, cardsPerPage]);

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>TeenVision Team</h2>

        <div
          className={styles.carouselWrapper}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className={styles.navButtonLeft}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous team members"
            >
              <FaChevronLeft />
            </button>
          </div>

          <div className={styles.carousel} ref={carouselRef}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={member.image} alt={`${member.name}'s profile`} />
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
                    rel="noreferrer"
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={member.social.telegram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name}'s Telegram`}
                  >
                    <FaTelegram />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.navButtonRight}>
            <button
              className={styles.navButton}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next team members"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: totalCards - cardsPerPage + 1 }).map(
            (_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSection2;
