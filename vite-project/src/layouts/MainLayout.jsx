import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const location = useLocation();

  // Check if the current route is "/login"
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isLoginPage && <Navbar />} {/* Render Navbar only if not on the login page */}
      <Outlet />
    </div>
  );
};

export default MainLayout;