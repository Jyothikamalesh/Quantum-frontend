import React from "react";
import { SimulationListComponent } from "../../components/simulationList";
import { WithAppHeader } from "../../hoc";

const SimulationList = () => {
  return <SimulationListComponent />;
};

export default WithAppHeader(SimulationList);
