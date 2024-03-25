import {
  Box,
  Grid,
  Paper,
  Alert,
  Divider,
  Typography,
  AlertTitle,
  IconButton,
  InputAdornment,
  Button,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import CollegeLogo from "../../assets/images/college_logo@2x.png";
import DrdoLogo from "../../assets/images/drdo_logo@2x.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "Email is required!!",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Password is required!!",
    },
  });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const [registerResponse, setRegisterResponse] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeregister = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

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
      handleLoginClick();
    }
  };

  const handleLoginClick = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formValues.email.value,
        password: formValues.password.value,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        if (res.error) {
          setShowLoginError(true);
          setShowLoginMessage(res.data.message);
        } else {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          navigate("/simulation", { replace: false });
        }
      });
  };

  const handleSubmitregister = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 400) {
          throw new Error("A user with this email already exists.");
        } else if (res.status === 422) {
          throw new Error("Validation Error");
        } else {
          throw new Error("Unexpected error occurred.");
        }
      })
      .then((data) => {
        console.log(data)
        // Handle successful response
        setRegisterResponse(data);
        // Clear form fields if needed
        setRegisterData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        // Handle error responses
        console.log(error);
        setRegisterResponse(error.message);
      });
  };


  useEffect(() => {
    if (showLoginError) {
      setTimeout(() => {
        setShowLoginError(false);
      }, 3000);
    }
  }, [showLoginError]);

  return (
    <Paper className="login-wrapper">
      {showLoginError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {showLoginMessage}
        </Alert>
      )}
      <Grid container className="login--form">
        <Grid container item>
          <Grid item xs={9}>
            <Box
              component="img"
              sx={{
                height: 64,
                width: "auto",
              }}
              alt="Eshwar college logo"
              src={CollegeLogo}
            />
          </Grid>
          <Grid item xs={3}>
            <Box
              component="img"
              sx={{
                height: 64,
                width: "auto",
                float: "right",
              }}
              alt="DRDO logo"
              src={DrdoLogo}
            />
          </Grid>
        </Grid>

        <Divider
          sx={{
            width: 392,
            borderColor: "#225FA7",
            opacity: "0.3",
            paddingTop: "24px",
          }}
          variant="fullwidth"
          orientation="horizontal"
          flexItem
        />

        <Grid
          container
          item
          sx={{
            justifyContent: "center",
            paddingTop: "16px",
            paddingBottom: "12px",
          }}
        >
          <Typography className="login--form-projectName">QuD-SE</Typography>
        </Grid>

        <Grid container item>
          <Box sx={{ width: "100%", height: "100%" }}>
            <form noValidate onSubmit={handleSubmit}>
              <Grid item sx={{ padding: "12px 10px" }}>
                <Typography className="login--form-inputLabel">
                  Email
                </Typography>
                <TextField
                  name="email"
                  required
                  sx={{ width: "100%" }}
                  value={formValues.email.value}
                  onChange={handleChange}
                  error={formValues.email.error}
                  helperText={
                    formValues.email.error && formValues.email.errorMessage
                  }
                />
              </Grid>
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
                    formValues.password.error &&
                    formValues.password.errorMessage
                  }
                />
              </Grid>

              <Grid item sx={{ padding: "20px 10px", width: "100%" }}>
                <Button
                  sx={{
                    width: "100%", height: "48px", color: "blue", "&:hover": {
                      color: "white",
                    }
                  }}
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
              <div>
                <Grid item sx={{ padding: "20px 10px", width: "100%" }}>
                  <Button
                    sx={{
                      width: "100%", height: "48px", color: "blue", "&:hover": {
                        color: "white",
                      },
                    }}
                    variant="contained"
                    onClick={handleOpen}
                  >
                    Register
                  </Button>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Register</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      value={registerData.email}
                      onChange={handleChangeregister}
                    />
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      value={registerData.password}
                      onChange={handleChangeregister}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSubmitregister}>Submit</Button>
                  </DialogActions>
                </Dialog>
                {registerResponse && (
                  <Box mt={2}>
                    <Typography variant="body1">{registerResponse}</Typography>
                  </Box>
                )}
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
