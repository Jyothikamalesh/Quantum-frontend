import RouteApp from "./routes";
import { StyledEngineProvider } from "@mui/material/styles";
import "./styles.scss";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <RouteApp />
    </StyledEngineProvider>
  );
}

export default App;
