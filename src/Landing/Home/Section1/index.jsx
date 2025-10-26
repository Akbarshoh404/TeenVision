import React from "react";
import styles from "./style.module.scss";
import img1 from "../../../Components/images/VR Array 1 (1).png";
import img2 from "../../../Components/images/Line Chart 1.png";
import img3 from "../../../Components/images/clock 1.png";

const HomeSection1 = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.p1}>
          About <span>TeenVision</span>
        </h2>
        <p className={styles.p2}>
          TeenVision is an online platform designed to help high school students
          find and apply for verified opportunities such as summer schools,
          hackathons, and learning programs. With easy search and filter
          options, students can explore events based on interests, location, and
          format. Organizers can post and manage listings, while admins ensure
          authenticity and safety. TeenVision connects teens with inspiring
          experiences that support learning, creativity, and personal growth.
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardImg}>
              <img src={img1} alt="Verified Opportunities" />
            </div>
            <h3 className={styles.cardP1}>Verified Opportunities</h3>
            <p className={styles.cardP2}>
              Discover genuine, high-quality programs carefully checked by our
              team — from summer schools to hackathons and workshops. TeenVision
              ensures every listing is safe, credible, and student-focused.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImg}>
              <img src={img2} alt="Smart Search & Filters" />
            </div>
            <h3 className={styles.cardP1}>Smart Search & Filters</h3>
            <p className={styles.cardP2}>
              Find the right opportunity faster! Use filters by location,
              subject, cost, or format (online/in-person) to explore programs
              that match your interests and goals.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImg}>
              <img src={img3} alt="Easy Application Tracking" />
            </div>
            <h3 className={styles.cardP1}>Easy Application Tracking</h3>
            <p className={styles.cardP2}>
              Keep all your applications in one place. Track your progress, save
              favorites, and never miss a deadline with TeenVision’s simple
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection1;