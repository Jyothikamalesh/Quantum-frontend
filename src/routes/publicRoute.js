import { Routes, Route } from "react-router-dom";
import Home from "../screens/home";
import Login from "../screens/login";
import { Error } from "../components/notFound";
// protected imports
import {
  SimulationAddEdit,
  SimulationDetail,
  SimulationList,
} from "../screens/simulations";
import Admin from "../screens/admin/admin";
import Profile from "../screens/profile";
import ReportBug from "../screens/reportBug";
const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<Error />} />
      {/* protected routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/simulation" element={<SimulationAddEdit />} />
      <Route path="/simulation/list" element={<SimulationDetail/>} />
      <Route path="/simulation/:id" element={<SimulationDetail />} />
      <Route path="/simulation/:id/edit" element={<SimulationAddEdit />} />
      <Route path="/report-bug" element={<ReportBug />} />
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  );
};

export default PublicRoute;
