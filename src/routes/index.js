import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";
import { AuthProvider } from "./Context"; // Import the AuthProvider

const RouteApp = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PublicRoute />
        <PrivateRoute />
      </AuthProvider>
    </BrowserRouter>

  );
};

export default RouteApp;
