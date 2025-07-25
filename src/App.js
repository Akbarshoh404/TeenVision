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
import DashboardHome from "./Dashboard/Pages/User/Home";

import DashboardAdminDeletedPrograms from "./Dashboard/Pages/Admin/DeletedPrograms";
import DashboardAdminNewPrograms from "./Dashboard/Pages/Admin/NewPrograms";
import DashboardAdminCreatePrograms from "./Dashboard/Pages/Admin/CreatePrograms";
import DashboardAdminProgramEdit from "./Dashboard/Pages/Admin/ProgramEdit";
import DashboardSettings from "./Dashboard/Pages/User/Settings";

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
      <Route path="/dashboard/settings" element={<DashboardSettings />} />

      {/* Dashboard Admins */}
      <Route
        path="/dashboard/admin/new-programs"
        element={<DashboardAdminNewPrograms />}
      />
      <Route
        path="/dashboard/admin/new-programs/create"
        element={<DashboardAdminCreatePrograms />}
      />
      <Route
        path="/dashboard/admin/new-programs/:slug"
        element={<DashboardAdminProgramEdit />}
      />
      <Route
        path="/dashboard/admin/deleted-programs"
        element={<DashboardAdminDeletedPrograms />}
      />

      {/* Fallback Route */}
      <Route path="*" element={<Landing404 />} />
    </Routes>
  );
}

export default App;
