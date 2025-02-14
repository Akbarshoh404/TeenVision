import { Routes, Route } from "react-router-dom";

import LandingHome from "./Landing/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingHome />} />
      </Routes>
    </>
  );
}

export default App;
