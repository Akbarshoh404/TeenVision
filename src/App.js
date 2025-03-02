import { Routes, Route } from "react-router-dom";

import LandingHome from "./Landing/Home";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Landing404 from "./Landing/404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Landing404 />} />
      </Routes>
    </>
  );
}

export default App;
