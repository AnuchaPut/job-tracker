import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayouts() {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  );
}