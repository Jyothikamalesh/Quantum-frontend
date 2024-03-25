import React from "react";
import { BrowserRouter} from "react-router-dom";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

const RouteApp = () => {
  return (
    <BrowserRouter>
      <PublicRoute />
      {/* <PrivateRoute /> */}
    </BrowserRouter>
  );
};

export default RouteApp;
