import React, { useState } from "react";
import styles from "./style.module.scss";

const commentsData = [
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "Jane Doe",
    job: "Marketing Director at XYZ Corp",
  },
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    job: "Product Manager at ABC Inc",
  },
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "Emily Johnson",
    job: "CTO at Tech Solutions",
  },
];

const HomeSection4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? commentsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === commentsData.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          {commentsData.map((comment, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${
                index === currentIndex ? styles.active : ""
              }`}
            >
              <div className={styles.commentBubble}>
                <p className={styles.commentText}>"{comment.text}"</p>
              </div>
              <div className={styles.commentInfo}>
                <p className={styles.author}>{comment.author}</p>
                <p className={styles.job}>{comment.job}</p>
              </div>
            </div>
          ))}
          <div className={styles.navigation}>
            <button
              onClick={handlePrev}
              className={styles.arrow}
              aria-label="Previous comment"
            >
              ←
            </button>
            <div className={styles.dots}>
              {commentsData.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${
                    index === currentIndex ? styles.activeDot : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className={styles.arrow}
              aria-label="Next comment"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection4;
