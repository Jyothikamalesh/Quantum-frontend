import {
  Box,
  Grid,
  Paper,
  Divider,
  Typography,
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
import React, {useState } from "react";
import CollegeLogo from "../../assets/images/college_logo@2x.png";
import DrdoLogo from "../../assets/images/drdo_logo@2x.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../routes/Context";
const LoginForm = () => {
  const { login  } = useAuth(); 
  const [open, setOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginFormValues, setLoginFormValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeregister = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
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
        setRegisterResponse("Register Success");
        // Clear form fields if needed
        setRegisterData({
          email: "",
          password: "",
          name: ""
        });
      })
      .catch((error) => {
        // Handle error responses
        console.log(error + "---");
        setRegisterResponse(error.message);
      });
  };
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLoginClick = async () => {
    if (!loginFormValues.email || !loginFormValues.password) {
      setErrorMessage("Please enter both email and password");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('username', loginFormValues.email);
      formData.append('password', loginFormValues.password);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setErrorMessage("");
      setSuccessMessage(response.data.message);

      const access_token = response.data.access_token;

      console.log(access_token);
       login(access_token);
      // Redirect to /simulation after 2 seconds if login successful
      setTimeout(() => {
        navigate("/simulation");
      }, 2000);
    } catch (error) {
      console.log(error)
      setSuccessMessage("");
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <Paper className="login-wrapper">
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
            <form >
              <Grid item xs={12} sx={{ padding: "12px 10px" }}>
                <Typography className="login--form-inputLabel">Email</Typography>
                <TextField
                  name="email"
                  required
                  fullWidth
                  value={loginFormValues.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "12px 10px" }}>
                <Typography className="login--form-inputLabel">Password</Typography>
                <TextField
                  name="password"
                  fullWidth
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
                  value={loginFormValues.password}
                  onChange={handleChange}
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
              </Grid>
              <Grid item sx={{ padding: "20px 10px", width: "100%" }}>
                <Button
                  sx={{
                    width: "100%", height: "48px", color: "blue", "&:hover": {
                      color: "white",
                    },
                  }}
                  variant="contained"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              </Grid>
              {successMessage && (
                <Grid item xs={12} sx={{ padding: "12px 10px" }}>
                  <Typography>{successMessage}</Typography>
                </Grid>
              )}

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
                      id="name"
                      name="name"
                      label="Name"
                      type="name"
                      fullWidth
                      value={registerData.name}
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
                    {registerResponse && ( 
                      <Typography variant="body1" sx={{ marginTop: '16px', color: 'red' }}>
                        {registerResponse}
                      </Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSubmitregister}>Submit</Button>
                  </DialogActions>
                </Dialog>

              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
