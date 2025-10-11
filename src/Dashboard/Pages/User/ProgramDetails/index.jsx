// ProgramDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";
import img from "../../../../Components/images/program sample.png";

const ProgramDetails = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `https://teenvision-1.onrender.com/api/v1/programs/${slug}/`
        );
        const data = {
          ...response.data,
          photo: response.data.photo || img,
          desc: response.data.desc || "No description available",
          date: response.data.created_at,
          type: response.data.type || "program",
          major: response.data.major || [],
          gender:
            response.data.gender === "any"
              ? "All"
              : response.data.gender.charAt(0).toUpperCase() +
                response.data.gender.slice(1),
          format: response.data.format
            ? response.data.format.charAt(0).toUpperCase() +
              response.data.format.slice(1)
            : "Unknown",
          full_info:
            response.data.full_info || "No additional information available",
          deadline: response.data.deadline || "N/A",
          funding: response.data.funding || "N/A",
          start_age: response.data.start_age || "N/A",
          end_age: response.data.end_age || "N/A",
          link: response.data.link || "#",
        };
        setProgram(data);

        // Fetch major names
        const majorPromises = data.major.map((id) =>
          axios.get(`https://teenvision-1.onrender.com/api/v1/majors/${id}/`)
        );
        const majorResponses = await Promise.all(majorPromises);
        setMajors(majorResponses.map((res) => res.data.name));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching program:", error);
        toast.error("Failed to load program details.");
        setLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

  const handleImageError = (e) => {
    e.target.src = img;
    setImageError(true);
    toast.error("Could not load the image. Using default.");
  };

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const closeNav = () => setIsNavOpen(false);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  if (!program) {
    return <div className={styles.error}>Program not found.</div>;
  }

  return (
    <div className={styles.programDetails}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: '"Inter", sans-serif',
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "10px 15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          error: { style: { border: "1px solid #dc2626" } },
        }}
      />
      <DashboardNavbar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        closeNav={closeNav}
      />
      <DashboardTopBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <main className={styles.mainContent}>
        <div className={styles.hero}>
          <img
            src={program.photo}
            alt={program.title}
            className={styles.heroImage}
            onError={handleImageError}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>{program.title}</h1>
            <a
              href={program.link}
              className={styles.applyButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.infoBar}>
            <span className={styles.infoItem}>{program.country || "N/A"}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.infoItem}>{program.type}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.infoItem}>
              {new Date(program.date).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.majors}>
            {majors.map((majorName, index) => (
              <span key={index} className={styles.majorButton}>
                {majorName}
              </span>
            ))}
          </div>
          <p className={styles.fullInfo}>{program.full_info}</p>
          <p className={styles.desc}>{program.desc}</p>
          <div className={styles.extraInfoGrid}>
            <div className={styles.extraInfoCard}>
              <span className={styles.extraLabel}>Deadline</span>
              <span className={styles.extraValue}>{program.deadline}</span>
            </div>
            <div className={styles.extraInfoCard}>
              <span className={styles.extraLabel}>Format</span>
              <span className={styles.extraValue}>{program.format}</span>
            </div>
            <div className={styles.extraInfoCard}>
              <span className={styles.extraLabel}>Funding</span>
              <span className={styles.extraValue}>{program.funding}</span>
            </div>
            <div className={styles.extraInfoCard}>
              <span className={styles.extraLabel}>Age Range</span>
              <span className={styles.extraValue}>
                {program.start_age} - {program.end_age}
              </span>
            </div>
            <div className={styles.extraInfoCard}>
              <span className={styles.extraLabel}>Gender</span>
              <span className={styles.extraValue}>{program.gender}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

ProgramDetails.propTypes = {};

export default ProgramDetails;
