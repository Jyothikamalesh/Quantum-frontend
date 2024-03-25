import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import BugImg from "../../assets/images/bug@2x.png";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const ReportBugComponent = () => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: "Name is required!!",
    },
    subject: {
      value: "",
      error: false,
      errorMessage: "Subject is required!!",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "Email is required!!",
    },
    description: {
      value: "",
      error: false,
      errorMessage: "Description is required!!",
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState("");

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
    await fetch(`${process.env.REACT_APP_API_URL}/simulation/report_bug`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.access_token,
      },
      body: JSON.stringify({
        name: formValues.name.value,
        email: formValues.email.value,
        subject: formValues.subject.value,
        description: formValues.description.value,
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
          setShowError(true);
          setShowMessage(res.data.message);
        } else {
          setShowSuccess(true);
          setShowMessage(res.data.message);
          revertFormValues();
        }
      });
  };

  const revertFormValues = () => {
    setFormValues({
      name: {
        value: "",
        error: false,
        errorMessage: "Name is required!!",
      },
      subject: {
        value: "",
        error: false,
        errorMessage: "Subject is required!!",
      },
      email: {
        value: "",
        error: false,
        errorMessage: "Email is required!!",
      },
      description: {
        value: "",
        error: false,
        errorMessage: "Description is required!!",
      },
    });
  };

  useEffect(() => {
    if (showError || showSuccess) {
      setTimeout(() => {
        setShowError(false);
        setShowSuccess(false);
      }, 3000);
    }
  }, [showError, showSuccess]);

  return (
    <Grid container className="reportBug-container">
      <Grid container item className="reportBug-header">
        <Grid item>
          <Typography
            sx={{
              font: "normal normal bold 24px/29px Poppins",
              color: "#000000",
            }}
          >
            Report Bug
          </Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Paper elevation={0} className="reportBug-paper">
          <Grid container sx={{ padding: "36px" }}>
            <Grid
              item
              xs
              sx={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: "98px",
                  width: "auto",
                  paddingBottom: "24px",
                }}
                alt="Bug image"
                src={BugImg}
              />
              <Typography
                sx={{
                  font: "normal normal bold 18px/24px Poppins",
                  color: "#000",
                }}
              >
                We are here to solve your problems
              </Typography>
              <Typography
                sx={{
                  font: "normal normal normal 16px/24px Poppins",
                  color: "#000",
                }}
              >
                Kindly fill the form and send to us
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs sx={{ padding: "0px 30px 0px 66px" }}>
              {showSuccess && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  {showMessage}
                </Alert>
              )}
              {showError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {showMessage}
                </Alert>
              )}
              <form noValidate onSubmit={handleSubmit}>
                <Grid container item className="reportBug--form-wrapper">
                  <Grid item xs={4} className="reportBug--form-label">
                    <Typography className="reportBug--form-labelText">
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      name="name"
                      required
                      sx={{ width: "100%" }}
                      value={formValues.name.value}
                      onChange={handleChange}
                      error={formValues.name.error}
                      helperText={
                        formValues.name.error && formValues.name.errorMessage
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item className="reportBug--form-wrapper">
                  <Grid item xs={4} className="reportBug--form-label">
                    <Typography className="reportBug--form-labelText">
                      Subject
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      name="subject"
                      required
                      sx={{ width: "100%" }}
                      value={formValues.subject.value}
                      onChange={handleChange}
                      error={formValues.subject.error}
                      helperText={
                        formValues.subject.error &&
                        formValues.subject.errorMessage
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item className="reportBug--form-wrapper">
                  <Grid item xs={4} className="reportBug--form-label">
                    <Typography className="reportBug--form-labelText">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
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
                </Grid>
                <Grid container item className="reportBug--form-wrapper">
                  <Grid item xs={4}>
                    <Typography className="reportBug--form-labelText">
                      Description
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      name="description"
                      required
                      sx={{ width: "100%" }}
                      multiline
                      rows={5}
                      maxRows={Infinity}
                      value={formValues.description.value}
                      onChange={handleChange}
                      error={formValues.description.error}
                      helperText={
                        formValues.description.error &&
                        formValues.description.errorMessage
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  className="reportBug--form-wrapper"
                  sx={{ flexDirection: "row-reverse" }}
                >
                  <Button
                    sx={{ width: "98px", height: "40px" }}
                    variant="contained"
                    type="submit"
                  >
                    Send
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportBugComponent;
