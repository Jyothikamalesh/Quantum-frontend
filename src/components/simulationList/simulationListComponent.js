import { Box, Chip, Grid, IconButton, Link, Typography } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
};

const SimulationListComponent = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataRows, setDataRows] = useState([]);
  const [localCurrentPage, setLocalCurrentPage] = useState(0);

  const columns = [
    {
      field: "job_code",
      headerName: "Job Code",
      flex: 0.9,
      cellClassName: "simulationList-table__idCell",
      renderCell: (params) => (
        <Link href={"/simulation/" + params.row.job_code}>
          {params.row.job_code}
        </Link>
      ),
      sortable: false,
    },
    {
      field: "job_name",
      headerName: "Job Name",
      flex: 0.7,
      sortable: false,
    },
    {
      field: "start_time",
      headerName: "Submitted",
      flex: 0.9,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          clickable={false}
          className={
            "simulationDetail-jobStatusChip--" +
            params.row.status?.toLowerCase()
          }
        />
      ),
    },
    {
      field: "execution_time",
      headerName: "Run Time",
      flex: 0.7,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.2,
      getActions: (params) => [
        <IconButton
          onClick={() =>
            navigate("/simulation/" + params.row.job_code + "/edit", {
              replace: false,
            })
          }
        >
          <EditIcon />
        </IconButton>,
      ],
    },
  ];

  const fetchListData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/simulation/job_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.access_token,
      },
      body: JSON.stringify({
        page: localCurrentPage + 1,
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
        setDataRows(res.data.simulations);
        delete res.data?.simulations;
        setData(res.data);
      });
  };

  const paginationHandleChange = (page) => {
    setLocalCurrentPage(page);
  };

  useEffect(() => {
    fetchListData();
    // eslint-disable-next-line
  }, [localCurrentPage]);

  return (
    <Grid container className="simulationList-container">
      <Grid item className="simulationList-header">
        <Typography
          sx={{
            font: "normal normal bold 24px/29px Poppins",
            color: "#000000",
          }}
        >
          Simulations
        </Typography>
      </Grid>
      <Grid container item className="simulationList-tableWrapper">
        <DataGrid
          pagination
          paginationMode="server"
          rows={dataRows}
          columns={columns}
          pageSize={data.per_page ?? 10}
          rowsPerPageOptions={[data.per_page ?? 10]}
          disableSelectionOnClick
          disableColumnMenu
          experimentalFeatures={{ newEditingApi: true }}
          sx={{
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
            },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
          }}
          page={localCurrentPage}
          rowCount={data.total ?? 10}
          onPageChange={paginationHandleChange}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </Grid>
    </Grid>
  );
};

export default SimulationListComponent;
