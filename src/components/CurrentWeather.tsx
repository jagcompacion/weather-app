import { useEffect, useState } from "react";
import axios from "axios";
import { CoordinatesType, OpenWeatherType } from "@/types";
import Loading from "./Loading";

const IMG_URL = import.meta.env.VITE_API_IMG_URL;
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type CurrentWeatherProps = {
  coordinates: CoordinatesType;
};

type CurrentWeatherStateType = {
  temp: string;
  icon: string;
};

const CurrentWeather = ({ coordinates }: CurrentWeatherProps) => {
  const [isLoading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherStateType | null>(null);

  const fetchCurrentWeather = async (params: CoordinatesType) => {
    setLoading(true);
    try {
      const response = await axios.get<OpenWeatherType>(
        `${API_URL}/data/2.5/weather`,
        {
          params: {
            ...params,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      const {
        main: { temp },
        weather: [firstWeather],
      } = response.data;

      setCurrentWeather({
        temp: temp.toFixed(0),
        icon: firstWeather.icon,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) fetchCurrentWeather(coordinates);
  }, [coordinates]);

  if (isLoading) return <Loading />;

  if (!currentWeather) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={`${IMG_URL}/${currentWeather.icon}@4x.png`} />
        <div className="text-8xl">{currentWeather.temp}&deg;C</div>
        <div className="text-2xl">Today</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
