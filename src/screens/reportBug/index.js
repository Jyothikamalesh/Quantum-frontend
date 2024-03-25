import React from "react";
import { ReportBugComponent } from "../../components/reportBug";
import { WithAppHeader } from "../../hoc";

const ReportBug = () => {
  return <ReportBugComponent />;
};

export default WithAppHeader(ReportBug);
