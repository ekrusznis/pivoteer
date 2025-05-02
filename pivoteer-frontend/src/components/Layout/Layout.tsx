import Navigation from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
        <Navigation />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
