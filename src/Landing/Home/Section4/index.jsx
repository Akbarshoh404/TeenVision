import React, { useState, useRef, useEffect } from "react";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Handle dynamic height adjustment
  useEffect(() => {
    const updateHeight = () => {
      if (carouselRef.current) {
        const activeItem = carouselRef.current.querySelector(
          `.${styles.carouselItem}.${styles.active}`
        );
        if (activeItem) {
          carouselRef.current.style.height = `${activeItem.offsetHeight}px`;
        }
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [currentIndex]);

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev === 0 ? commentsData.length - 1 : prev - 1
      );
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev === commentsData.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleDotClick = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
    }
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.carousel} ref={carouselRef}>
          {commentsData.map((comment, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${
                index === currentIndex ? styles.active : ""
              }`}
              style={{
                transform: `translateX(${
                  index === currentIndex ? 0 : index < currentIndex ? -100 : 100
                }%)`,
                transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
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
        </div>
        <div className={styles.navigation}>
          <button
            onClick={handlePrev}
            className={styles.arrow}
            aria-label="Previous comment"
            disabled={isAnimating}
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
            disabled={isAnimating}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection4;
