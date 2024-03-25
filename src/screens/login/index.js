import React from "react";
import { Grid } from "@mui/material";
import { LoginForm } from "../../components/login";
import "./styles.scss"

const Login = () => {
  return (
    <Grid container className="login-container">
      <LoginForm />
    </Grid>
  );
};

export default Login;
