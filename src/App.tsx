import { Routes, Route, Navigate } from "react-router-dom";
import Forecast from "./pages/Forecast";
import History from "./pages/History";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/forcast" />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default App;
