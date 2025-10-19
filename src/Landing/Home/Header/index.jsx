import React from "react";
import styles from "./style.module.scss";

import { useNavigate } from "react-router-dom";

const Home_Header = () => {
  const navigate = useNavigate();
  const floatingComments = [
    {
      author: "John Ripkey",
      rating: 5.0,
      text1: "Lorem Ipsum is simply dummy text",
      text2: "of the printing and typesetting industry",
      x: "5%",
      y: "15%",
      type: "review",
    },
    {
      text: "Web Development",
      subtext: ["Personal", "Coding"], // Split keywords into array
      icon: "code",
      x: "70%",
      y: "55%",
      type: "code",
    },
    {
      text: "Game Development",
      subtext: ["Work", "Interactive games"], // Split keywords into array
      icon: "game",
      x: "75%",
      y: "65%",
      type: "game",
    },
  ];

  const icons = [
    { type: "lightbulb", x: "80%", y: "15%" },
    { type: "bell", x: "5%", y: "75%" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.centerTexts}>
            <p className={styles.centerText1}>
              We’re here to help you to be the <span>best one!</span>
            </p>
            <p className={styles.centerText2}>
              We harness the latest technologies to develop cutting-edge digital
              solutions for modern business requirements
            </p>
          </div>

          <button
            className={styles.seeMore}
            onClick={() => {
              const isAuthenticated = !!localStorage.getItem("access_token");
              navigate(isAuthenticated ? "/dashboard/home" : "/login");
            }}
          >
            See more
          </button>

          <div className={styles.numbers}>
            <div className={styles.centerCard}>
              <p className={styles.centerCardP1}>1234</p>
              <p className={styles.centerCardP2}>Lorem Ipsum is Simply</p>
            </div>
            <div className={styles.centerCard}>
              <p className={styles.centerCardP1}>1234</p>
              <p className={styles.centerCardP2}>Lorem Ipsum is Simply</p>
            </div>
          </div>
        </div>

        {floatingComments.map((comment, index) => (
          <div
            key={index}
            className={styles[`${comment.type}Card`]}
            style={{ left: comment.x, top: comment.y }}
          >
            {comment.author && (
              <>
                <div className={styles.commentHeader}>
                  <div className={styles.commentImage}></div>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                </div>
                <div className={styles.commentRating}>
                  ★★★★★ {comment.rating}
                </div>
                <p className={styles.commentText1}>{comment.text1}</p>
                <p className={styles.commentText2}>{comment.text2}</p>
              </>
            )}
            {comment.icon && (
              <>
                <div className={styles.commentIcon}></div>
                <div>
                  <p className={styles.commentTitle}>{comment.text}</p>
                  <div className={styles.keywordContainer}>
                    {comment.subtext.map((keyword, idx) => (
                      <span key={idx} className={styles.commentSubtext}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`${styles.floatingIcon} ${styles[icon.type]}`}
            style={{ left: icon.x, top: icon.y }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home_Header;
