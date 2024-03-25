import Editor, { useMonaco } from "@monaco-editor/react";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";
import "./styles.scss";

const SimulationComponent = (props) => {
  let navigate = useNavigate();
  const { id } = props;

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [qCode, setQCode] = useState("# Add code here");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showCircuit, setShowCircuit] = useState(false);
  const [circuitSvg, setCircuitSvg] = useState(null);
  const [formValues, setFormValues] = useState({
    jobName: {
      value: "",
      error: false,
      errorMessage: "Job Name is required!!",
    },
  });

  const monaco = useMonaco();
  const editorRef = useRef(null);

  editorRef?.current?.addCommand(
    monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    async () => {
      await handleKeyBinding();
    }
  );

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

  const handleEditorChange = (value, event) => {
    setQCode(encodeURI(value));
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleKeyBinding = async () => {
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
      setOpen(true);
      await fetch(`${process.env.REACT_APP_API_URL}/simulation/run_code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.access_token,
        },
        body: JSON.stringify({
          job_name: formValues.jobName.value,
          code: qCode,
        }),
      })
        .then((result) => {
          if (result.status === 401) {
            localStorage.setItem("access_token", null);
            localStorage.setItem("refresh_token", null);
            navigate("/login", { replace: false });
          } else if (result.status === 200) {
            return result.text();
          } else {
            return result.json();
          }
        })
        .then((res) => {
          if (res.statusCode === 400) {
            setErrorMessage(res.data.message);
            setShowError(true);
          } else {
            setShowCircuit(true);
            setCircuitSvg(res);
          }

          setOpen(false);
        });
    }
  };

  const handleSubmitClick = async () => {
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
      await fetch(`${process.env.REACT_APP_API_URL}/simulation/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.access_token,
        },
        body: JSON.stringify({
          job_name: formValues.jobName.value,
          code: qCode,
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
          if (res.statusCode === 422) {
            setErrorMessage(res.data.error);
            setShowError(true);
          } else if (res.statusCode === 200) {
            navigate("/simulation/list", { replace: false });
          }
        });
    }
  };

  const fetchData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/simulation/job_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.access_token,
      },
      body: JSON.stringify({
        job_code: id,
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
        setEditData(res.data.simulations[0]);
        setFormValues({
          ...formValues,
          jobName: {
            ...formValues["jobName"],
            value: res.data.simulations[0]?.job_name,
          },
        });
        setQCode(encodeURI(res.data.simulations[0]?.code));
      });
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container className="simulation-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {showError && (
        <Modal
          open={showError}
          onClose={() => {
            setShowError(false);
          }}
        >
          <Grid container>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Alert severity="error" onClose={() => setShowError(false)}>
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
            </Box>
          </Grid>
        </Modal>
      )}
      <Grid item className="simulation-header">
        <Typography
          sx={{
            font: "normal normal 600 14px/17px Poppins",
            color: "#000000",
            paddingRight: "12px",
          }}
        >
          Job Name
        </Typography>
        <TextField
          name="jobName"
          required
          className="simulation--jobName"
          value={formValues.jobName.value}
          onChange={handleChange}
          error={formValues.jobName.error}
          helperText={
            formValues.jobName.error && formValues.jobName.errorMessage
          }
        />
      </Grid>
      <Grid
        container
        item
        xs={showCircuit ? 6 : 12}
        sx={showCircuit ? { paddingRight: "8px" } : {}}
      >
        <Grid container item className="simulation-editorWrapper">
          <Grid item className="simulation--editorHeader">
            <Typography className="simulation--editorHeader-text">
              Editor
            </Typography>
          </Grid>
          <Grid item className="simulation--editorContainer">
            <Editor
              defaultLanguage="python"
              defaultValue={decodeURI(qCode)}
              onChange={handleEditorChange}
              value={decodeURI(qCode)}
              onMount={handleEditorDidMount}
            />
          </Grid>
          <Grid container item className="simulation--editorFooter">
            <Grid item xs={10} sx={{ padding: "15px 18px" }}>
              <Typography className="simulation--editorFooter-text">
                Press Shift + Enter to generate Quantum Circuit
              </Typography>
              {/* <Typography className="simulation--editorFooter-text">
                To add measurements, right-click on measure statement with blue
                background
              </Typography> */}
            </Grid>
            <Grid item xs={2} sx={{ padding: "14px" }}>
              <Button
                sx={{
                  width: "124px",
                  height: "40px",
                  float: "right",
                  font: "normal normal 600 14px/18px Poppins",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={handleSubmitClick}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {showCircuit && (
        <Grid
          container
          item
          xs={6}
          sx={showCircuit ? { paddingLeft: "8px" } : {}}
        >
          <Grid container item className="simulation-circuitWrapper">
            <Grid item className="simulation--editorHeader">
              <Typography className="simulation--editorHeader-text">
                Quantum Circuit
              </Typography>
            </Grid>
            <Grid item className="simulation--circuitContainer">
              <SVG src={circuitSvg} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SimulationComponent;
