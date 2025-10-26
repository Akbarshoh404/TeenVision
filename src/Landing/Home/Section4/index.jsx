import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";

const commentsData = [
  {
    text: "TeenVision helped me find the perfect summer program that matched my interests in technology and design. The verified listings and easy filters made searching stress-free. I love how personalized the recommendations are — it really feels like the platform understands what students are looking for.",
    author: "Nargiza S. 17",
    job: "Student",
  },
  {
    text: "I always suggest TeenVision to my students. It’s reliable, well-organized, and full of genuine opportunities. The platform makes it easier for teens to explore verified programs, track deadlines, and stay motivated. It’s an incredible resource that truly supports both students and educators.",
    author: "Mr. Shuhrat",
    job: "High School Teacher",
  },
  {
    text: "TeenVision made finding and managing hackathon applications so simple. I could filter events, save favorites, and never miss a deadline. It’s an amazing tool that helped me discover new interests and connect with other passionate students who love to learn and create.",
    author: "Kassym P. 16",
    job: "Student",
  },
];

const HomeSection4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

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
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>What Our Users Say</h2>
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
