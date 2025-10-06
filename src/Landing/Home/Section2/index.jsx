import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "./style.module.scss";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import img from "../../../Components/images/cardexample.png";

const teamMembers = [
  {
    id: 1,
    image: img,
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
  {
    id: 4,
    image: img,
    name: "Emily Davis",
    responsibility: "Marketing Specialist",
    description:
      "Emily develops marketing strategies that drive brand awareness and engagement.",
    social: {
      instagram: "https://instagram.com/emilydavis",
      twitter: "https://twitter.com/emilydavis",
      linkedin: "https://linkedin.com/in/emilydavis",
    },
  },
  {
    id: 5,
    image: img,
    name: "Michael Brown",
    responsibility: "QA Engineer",
    description:
      "Michael ensures the quality and reliability of our software through rigorous testing.",
    social: {
      instagram: "https://instagram.com/michaelbrown",
      twitter: "https://twitter.com/michaelbrown",
      linkedin: "https://linkedin.com/in/michaelbrown",
    },
  },
  {
    id: 6,
    image: img,
    name: "Sarah Wilson",
    responsibility: "Content Writer",
    description:
      "Sarah creates compelling content that resonates with our audience.",
    social: {
      instagram: "https://instagram.com/sarahwilson",
      twitter: "https://twitter.com/sarahwilson",
      linkedin: "https://linkedin.com/in/sarahwilson",
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
                    href={member.social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <FaTwitter />
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
