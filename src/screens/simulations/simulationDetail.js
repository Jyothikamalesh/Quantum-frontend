import React from "react";
import { useParams } from "react-router-dom";
import { SimulationDetailComponent } from "../../components/simulationDetail";
import { WithAppHeader } from "../../hoc";

const SimulationDetail = () => {
  // let { id } = useParams();

  // return <SimulationDetailComponent id={id} />;
  return <SimulationDetailComponent />;
};

export default WithAppHeader(SimulationDetail);
