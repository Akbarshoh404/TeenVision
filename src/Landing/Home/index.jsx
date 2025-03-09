import React from "react";

import styles from "./style.module.scss";

import LandingNavbar from "../../Layoutes/Navbar";
import LandingFooter from "../../Layoutes/Footer";

import Home_Header from "./Header";
import HomeSection1 from "./Section1";
import HomeSection2 from "./Section2";
import HomeSection3 from "./Section3";

const LandingHome = () => {
  return (
    <>
      <LandingNavbar />
      <Home_Header />
      <HomeSection1 />
      {/* <HomeSection2 /> */}
      <HomeSection3 />
      <LandingFooter />
    </>
  );
};

export default LandingHome;
