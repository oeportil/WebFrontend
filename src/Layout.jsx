import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

const Layout = () => {
  return (
    <div>
      <Header />
      <Dashboard />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
