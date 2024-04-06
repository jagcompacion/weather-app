import { useSelector } from "react-redux";
import { RootState } from "../store";
import CurrentWeather from "@/components/CurrentWeather";
import Forecasts from "@/components/Forecasts";

const Forecast = () => {
  const { value: coordinates } = useSelector(
    (state: RootState) => state.coordinates
  );

  return (
    <div className="h-full flex flex-col">
      <CurrentWeather coordinates={coordinates} />
      <Forecasts coordinates={coordinates} />
    </div>
  );
};

export default Forecast;
