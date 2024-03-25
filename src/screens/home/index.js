import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const validateToken = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/auth/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.access_token,
      },
    }).then((result) => {
      if (result.status !== 200) {
        navigate("/login", { replace: false });
      } else {
        navigate("/simulation", { replace: false });
      }
    });
  };

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line
  }, []);

  return <></>;
};

export default Home;
