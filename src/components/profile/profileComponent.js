import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import "./styles.scss";
import DrdoLogo from "../../assets/images/drdo_logo@2x.png";
import { ChangePasswordModal } from "../changePassword";

const ProfileComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <Grid className="profile-container">
      <Paper className="profile-wrapper">
        {openModal && (
          <ChangePasswordModal
            openModal={openModal}
            handleModalClose={handleModalClose}
          />
        )}
        <Grid
          sx={{
            height: "88px",
            background: "#D4DAF9 0% 0% no-repeat padding-box",
            borderRadius: "10px 10px 0px 0px",
          }}
        />
        <Grid
          container
          item
          sx={{
            position: "relative",
            display: "grid",
            justifyContent: "center",
            justifyItems: "center",
            top: -64,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 128,
              width: 128,
            }}
            alt="DRDO logo"
            src={DrdoLogo}
          />
          <Typography
            sx={{
              paddingTop: "16px",
              font: "normal normal Bold 20px/24px Poppins",
            }}
          >
            DRDO Admin
          </Typography>
          <Typography
            sx={{
              paddingTop: "6px",
              font: "normal normal normal 14px/17px Poppins",
            }}
          >
            Administrator
          </Typography>
          <Typography
            sx={{
              paddingTop: "42px",
              font: "normal normal normal 16px/20px Poppins",
            }}
          >
            +91 9876543210
          </Typography>
          <Typography
            sx={{
              paddingTop: "6px",
              font: "normal normal normal 16px/20px Poppins",
            }}
          >
            drdoadmin@gmail.com
          </Typography>
        </Grid>
        <Grid
          continer
          item
          sx={{ display: "flex", position: "relative", top: -32 }}
          className="profile--button-container"
        >
          <Grid item xs={6}>
            <Button fullWidth className="profile--button" variant="outlined">
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className="profile--button"
              variant="outlined"
              onClick={handleModalOpen}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ProfileComponent;
