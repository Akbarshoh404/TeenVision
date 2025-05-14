import { Routes, Route } from "react-router-dom";

// Landing
import LandingHome from "./Landing/Home";
import Landing404 from "./Landing/404";
import LandingAboutUs from "./Landing/About Us";
import LandingExchangePrograms from "./Landing/Exchange Programs";
import LandingInternships from "./Landing/Internships";
import LandingMajors from "./Landing/Majors";

// Auth
import Login from "./Auth/Login";
import Register from "./Auth/Register";

// Dashboard
import DashboardHome from "./Dashboard/Pages/Home";

function App() {
  return (
    <Routes>
      {/* Landing Routes */}
      <Route path="/" element={<LandingHome />} />
      <Route path="/about" element={<LandingAboutUs />} />
      <Route path="/exchangeprograms" element={<LandingExchangePrograms />} />
      <Route path="/internships" element={<LandingInternships />} />
      <Route path="/majors" element={<LandingMajors />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard/home" element={<DashboardHome />} />

      {/* Fallback Route */}
      <Route path="*" element={<Landing404 />} />
    </Routes>
  );
}

export default App;
