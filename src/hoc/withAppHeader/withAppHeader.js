import React from "react";
import Container from "@mui/material/Container";
import { Header } from "../../components/header";

const WithAppHeader = (Component) => (props) => {
  return (
    <Container
      disableGutters
      maxWidth={"100vw"}
      sx={{ height: "100vh", maxHeight: "100vh" }}
    >
      <Header />
      <Component {...props}>{props.children}</Component>
    </Container>
  );
};

export default WithAppHeader;
