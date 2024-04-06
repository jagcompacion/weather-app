import { useState, useEffect } from "react";
import { format, fromUnixTime } from "date-fns";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HistoryDataType } from "@/types";
import Loading from "@/components/Loading";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type WeathersStateType = {
  dateTime: string;
  temp: string;
  feelsLike: string;
};

const History = () => {
  const [weathers, setWeathers] = useState<WeathersStateType[] | []>([]);
  const [isLoading, setLoading] = useState(false);

  const { value: coordinates } = useSelector(
    (state: RootState) => state.coordinates
  );

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          ...coordinates,
          start: 1617692400,
          end: 1617778800,
          appid: API_KEY,
          units: "metric",
        },
      });
      const data = response.data;
      setWeathers(processWeatherData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const processWeatherData = (data: HistoryDataType): WeathersStateType[] =>
    data.hourly.map((hour) => ({
      dateTime: format(fromUnixTime(hour.dt), "h:mm a"),
      temp: hour.temp,
      feelsLike: hour.feels_like,
    }));

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>High</TableHead>
          <TableHead>Low</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weathers.length > 0 ? (
          weathers.map((weather) => (
            <TableRow key={weather.dateTime}>
              <TableCell className="font-medium">{weather.dateTime}</TableCell>
              <TableCell className="text-right">{weather.temp}&deg;C</TableCell>
              <TableCell className="text-right">
                {weather.feelsLike}&deg;C
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No historical data avaiable.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default History;
