import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function Error() {
  let navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid sx={{ display: "grid", justifyItems: "center" }}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/login", { replace: false })}
              sx={{ marginTop: "16px" }}
            >
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
