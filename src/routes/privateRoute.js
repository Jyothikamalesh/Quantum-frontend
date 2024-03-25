import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../screens/profile";
import ReportBug from "../screens/reportBug";
import {
  SimulationAddEdit,
  SimulationDetail,
  SimulationList,
} from "../screens/simulations";
import { Error } from "../components/notFound";

const PrivateRoute = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.access_token === undefined ||
      localStorage.access_token === null
    ) {
      navigate("/login", { replace: false });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {localStorage.access_token && (
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/simulation" element={<SimulationAddEdit />} />
          <Route path="/simulation/list" element={<SimulationList />} />
          <Route path="/simulation/:id" element={<SimulationDetail />} />
          <Route path="/simulation/:id/edit" element={<SimulationAddEdit />} />
          <Route path="/report-bug" element={<ReportBug />} />
        </Routes>
      )}
    </>
  );
};

export default PrivateRoute;
