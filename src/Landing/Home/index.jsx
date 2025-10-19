import React from "react";

// import styles from "./style.module.scss";

import LandingNavbar from "../../Layoutes/Navbar";
import LandingFooter from "../../Layoutes/Footer";

import Home_Header from "./Header";
import HomeSection1 from "./Section1";
import HomeSection2 from "./Section2";
import HomeSection3 from "./Section3";
import HomeSection4 from "./Section4";

const LandingHome = () => {
  return (
    <>
      <LandingNavbar />
      <div id="home">
        <Home_Header />
      </div>
      <div id="about">
        <HomeSection2 />
      </div>
      <div id="programs">
        <HomeSection1 />
      </div>
      <div id="reviews">
        <HomeSection3 />
        <HomeSection4 />
      </div>
      <LandingFooter />
    </>
  );
};

export default LandingHome;
