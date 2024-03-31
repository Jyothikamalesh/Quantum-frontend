import { Routes, Route } from "react-router-dom";
import Home from "../screens/home";
import Login from "../screens/login";
import { Error } from "../components/notFound";
const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<Error />} />
    </Routes>
  );
};

export default PublicRoute;
