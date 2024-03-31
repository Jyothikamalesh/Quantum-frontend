import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../screens/profile";
import {
  SimulationAddEdit,
  SimulationDetail,
  SimulationList,
} from "../screens/simulations";
import { Error } from "../components/notFound";
import { useAuth } from "./Context";
import Admin from "../../src/screens/admin/admin";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isValidTokenAvailable, isValueAvailable, getusertype } = useAuth();

  useEffect(() => {
    if (!isValidTokenAvailable()) {
      navigate("/login", { replace: false });
    }
  }, [isValidTokenAvailable, navigate]);

  return (
    <>
      {isValidTokenAvailable() && isValueAvailable() && (
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/simulation" element={<SimulationAddEdit />} />
          <Route path="/simulation/list" element={<SimulationList />} />
          <Route path="/simulation/:id" element={<SimulationDetail />} />
          <Route path="/simulation/:id/edit" element={<SimulationAddEdit />} />
          {getusertype() && <Route path="/admin" element={<Admin />} />}
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </>
  );
};

export default PrivateRoute;
