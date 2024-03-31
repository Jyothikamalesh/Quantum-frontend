import {
  Grid,
  Box,
  Divider,
  Tabs,
  Tab,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import "./styles.scss";
import styles from "./header.module.scss";
import NavLogo from "../../assets/images/nav_logo@2x.png";
import QudLogo from "../../assets/images/QuD-SE@2x.png";
import DrdoLogo from "../../assets/images/drdo_logo@2x.png";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangePasswordModal } from "../changePassword";
import { useAuth } from "../../routes/Context"; // Import the useAuth hook; 
const Header = () => {
  const { logout, getusertype } = useAuth();

  let navigate = useNavigate();
  let location = useLocation();
  const [value, setValue] = useState(() => {
    console.log(location.pathname);
    switch (location.pathname) {
      case "/simulation":
        return "1";
      case "/simulation/list":
        return "3";
      case "/admin":
        return "4";
      default:
        return "1";
    }
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className="header-container">
      <Grid container className="header-wrapper">
        {openModal && (
          <ChangePasswordModal
            openModal={openModal}
            handleModalClose={handleModalClose}
          />
        )}
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            maxHeight: "72px",
            padding: "12px 0px",
          }}
        >
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "auto",
            }}
            alt="Eshwar college logo"
            src={NavLogo}
          />

          <Box
            component="img"
            sx={{
              height: "33px",
              width: "96px",
            }}
            alt="QuD logo"
            src={QudLogo}
          />
          <Divider
            sx={{ border: "1px solid #DDDDDD", opacity: "0.5" }}
            orientation="vertical"
          />
        </Grid>

        <Grid item xs={7}>
          <Tabs
            className={styles.tabs}
            value={value}
            onChange={handleChange}
            classes={{
              flexContainer: styles.flexContainer,
              indicator: styles.indicator,
            }}
          >
            <Tab
              label="Simulations"
              value="1"
              className={styles.tab}
              classes={{
                selected: styles.selected,
              }}
              onClick={() => navigate("/simulation", { replace: false })}
            />

            <Tab
              label="Histrory"
              value="3"
              className={styles.tab}
              classes={{
                selected: styles.selected,
              }}
              onClick={() => navigate("/simulation/list", { replace: false })}
            />

            {getusertype() !== null && getusertype() && (
              <Tab
                label="Admin"
                value="4"
                className={styles.tab}
                classes={{
                  selected: styles.selected,
                }}
                onClick={() => navigate("/admin", { replace: false })}
              />
            )}



          </Tabs>
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tooltip title="Profile settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <KeyboardArrowDownOutlined sx={{ color: "#ffffff" }} />
              <Avatar
                sx={{ height: "50px", width: "50px" }}
                alt="DRDO logo"
                src={DrdoLogo}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/profile", { replace: false })}>
            Profile settings
          </MenuItem>
          <MenuItem onClick={handleModalOpen}>Change Password</MenuItem>
          <MenuItem
            onClick={() => {
              logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Header;
