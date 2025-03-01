import { Routes, Route } from "react-router-dom";

import LandingHome from "./Landing/Home";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
