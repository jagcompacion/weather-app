export type CoordinatesType = {
  lat: string;
  lon: string;
};

type WeatherType = {
  icon: string;
};

export type OpenWeatherType = {
  dt_txt: string;
  main: { temp: number };
  weather: WeatherType[];
};

export type GeocodeTypes = {
  lat: string;
  lon: string;
  name: string;
  state: string;
  country: string;
};

type TempType = {
  temp: string;
  feels_like: string;
  dt: number;
};

export type HistoryDataType = {
  hourly: TempType[];
};
