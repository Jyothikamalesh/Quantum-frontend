import React from "react";
import { ProfileComponent } from "../../components/profile";
import { WithAppHeader } from "../../hoc";

const Profile = () => {
  return <ProfileComponent />;
};

export default WithAppHeader(Profile);
