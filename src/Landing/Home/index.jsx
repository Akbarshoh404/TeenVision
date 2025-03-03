import React from "react";

import styles from "./style.module.scss";
import LandingNavbar from "../../Layoutes/Navbar";
import Home_Header from "./Header";
import HomeSection1 from "./Section1";

const LandingHome = () => {
  return (
    <>
      <LandingNavbar />
      <Home_Header />
      <HomeSection1 />
    </>
  );
};

export default LandingHome;
