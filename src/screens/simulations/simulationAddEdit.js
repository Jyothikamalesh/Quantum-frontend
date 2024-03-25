import React from "react";
import { useParams } from "react-router-dom";
import { SimulationComponent } from "../../components/simulation";
import { WithAppHeader } from "../../hoc";
import Editor from "./Editor"
const SimulationAddEdit = () => {
  const { id } = useParams();
  return <Editor/>
  // return <SimulationComponent id={id} />;
};

export default WithAppHeader(SimulationAddEdit);
