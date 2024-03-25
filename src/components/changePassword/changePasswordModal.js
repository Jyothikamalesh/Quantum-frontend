import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ChangePasswordModal = (props) => {
  let navigate = useNavigate();
  const { openModal, handleModalClose } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showChangePasswordError, setShowChangePassowordError] =
    useState(false);
  const [showChangePasswordMessage, setShowChangePasswordMessage] =
    useState("");
  const [formValues, setFormValues] = useState({
    password: {
      value: "",
      error: false,
      errorMessage: "Password is required!!",
    },
    newPassword: {
      value: "",
      error: false,
      errorMessage: "New Password is required!!",
    },
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: "Confirm Password is required!!",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = false;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorFlag = false;

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
        errorFlag = true;
      }
    }
    setFormValues(newFormValues);

    if (!errorFlag) {
      handleClickChangePassword();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClickChangePassword = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/auth/change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.access_token,
      },
      body: JSON.stringify({
        password: formValues.password.value,
        new_password: formValues.newPassword.value,
        confirm_password: formValues.confirmPassword.value,
      }),
    })
      .then((result) => {
        if (result.status === 401) {
          localStorage.setItem("access_token", null);
          localStorage.setItem("refresh_token", null);
          navigate("/login", { replace: false });
        }
        return result.json();
      })
      .then((res) => {
        if (res.error) {
          setShowChangePassowordError(true);
          setShowChangePasswordMessage(res.data.message);
        } else {
          handleModalClose();
        }
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal open={openModal} onClose={handleModalClose}>
      <Grid container>
        <Box sx={modalStyle}>
          {showChangePasswordError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {showChangePasswordMessage}
            </Alert>
          )}
          <form noValidate onSubmit={handleSubmit}>
            <Grid item sx={{ padding: "12px 10px" }}>
              <Typography className="login--form-inputLabel">
                Password
              </Typography>
              <TextField
                name="password"
                sx={{ width: "100%" }}
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formValues.password.value}
                onChange={handleChange}
                error={formValues.password.error}
                helperText={
                  formValues.password.error && formValues.password.errorMessage
                }
              />
            </Grid>

            <Grid item sx={{ padding: "12px 10px" }}>
              <Typography className="login--form-inputLabel">
                New Password
              </Typography>
              <TextField
                name="newPassword"
                sx={{ width: "100%" }}
                required
                type={showNewPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formValues.newPassword.value}
                onChange={handleChange}
                error={formValues.newPassword.error}
                helperText={
                  formValues.newPassword.error &&
                  formValues.newPassword.errorMessage
                }
              />
            </Grid>

            <Grid item sx={{ padding: "12px 10px" }}>
              <Typography className="login--form-inputLabel">
                Confirm Password
              </Typography>
              <TextField
                name="confirmPassword"
                sx={{ width: "100%" }}
                required
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formValues.confirmPassword.value}
                onChange={handleChange}
                error={formValues.confirmPassword.error}
                helperText={
                  formValues.confirmPassword.error &&
                  formValues.confirmPassword.errorMessage
                }
              />
            </Grid>

            <Grid item sx={{ padding: "20px 10px", width: "100%" }}>
              <Button
                sx={{ width: "100%", height: "48px" }}
                variant="contained"
                type="submit"
              >
                Change Password
              </Button>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Modal>
  );
};

export default ChangePasswordModal;
