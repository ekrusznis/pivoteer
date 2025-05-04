import Navigation from "./Navigation";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <Navigation />
      </div>
      <div className="h-screen p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
