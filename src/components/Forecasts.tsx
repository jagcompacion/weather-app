import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { format } from "date-fns";
import { CoordinatesType, OpenWeatherType } from "@/types";
import Loading from "./Loading";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const IMG_URL = import.meta.env.VITE_API_IMG_URL;

type CurrentWeatherProps = {
  coordinates: CoordinatesType;
};

type ForecastStateType = {
  temp: string;
  icon: string;
  dateTime: string;
};

const Forecasts = ({ coordinates }: CurrentWeatherProps) => {
  const [forecasts, setForecasts] = useState<ForecastStateType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchForecasts = async (params: CoordinatesType) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/data/2.5/forecast`, {
        params: {
          ...params,
          appid: API_KEY,
          units: "metric",
          cnt: 5,
        },
      });
      const { list } = response.data;

      setForecasts(
        list.map((item: OpenWeatherType) => {
          const {
            dt_txt,
            main: { temp },
            weather: [firstWeather],
          } = item;

          return {
            temp: temp.toFixed(0),
            icon: firstWeather.icon,
            dateTime: format(dt_txt, "h:mm a"),
          };
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) fetchForecasts(coordinates);
  }, [coordinates]);

  if (isLoading) return <Loading />;

  if (!forecasts.length) return null;

  return (
    <div className="flex flex-wrap items-end justify-center space-y-4 space-x-4">
      {forecasts.map((forecast) => (
        <Card className="text-center" key={forecast.dateTime}>
          <CardHeader>
            <CardTitle>{forecast.temp}&deg;C</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <img src={`${IMG_URL}/${forecast.icon}@2x.png`} />
          </CardContent>
          <CardFooter className="justify-center">
            <p>{forecast.dateTime}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Forecasts;
