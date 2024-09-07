import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { useSelector } from "react-redux";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const RequireAuth = () => {

  const currentUser = useSelector((state)=>state.user.currentUser)

  return !currentUser ? (
    <Navigate to={"/login"} />
  ) : (
    <div className="layout">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export { Layout, RequireAuth };
