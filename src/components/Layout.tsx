import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="px-4 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
