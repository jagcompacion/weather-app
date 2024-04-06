import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { setCoordinates } from "@/slices/coordinatesSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AppDispatch } from "../store";
import { CoordinatesType, GeocodeTypes } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectedGeocode, setSelectedGeocode] =
    useState<CoordinatesType | null>(null);
  const [geocodeOptions, setGeocodeOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [debounceValue] = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debounceValue && !selectedGeocode) {
      fetchGeocode(debounceValue);
    }
  }, [debounceValue]);

  const fetchGeocode = async (searchValue: string) => {
    const response = await axios.get(
      `${API_URL}/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`
    );
    const data = response.data;
    setGeocodeOptions(data);
    if (data.length > 0) {
      setSelectedGeocode(null);
      setIsOpenOptions(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGeocode(null);
    setInputValue(e.target.value);
  };

  const handleSelectedGeocode = (geocode: GeocodeTypes) => {
    setSelectedGeocode({
      lat: geocode.lat,
      lon: geocode.lon,
    });
    setInputValue(
      [geocode.name, geocode.state, geocode.country]
        .filter((field) => !!field)
        .join(", ")
    );
    setIsOpenOptions(false);
  };

  const handleSubmit = () => {
    dispatch(setCoordinates(selectedGeocode));
  };

  return (
    <div className="flex p-4 space-x-4">
      <div className="w-full relative">
        <Input
          placeholder="Enter city"
          value={inputValue}
          onChange={handleChange}
        />
        {isOpenOptions && (
          <div className="z-10 w-full absolute bg-white rounded-lg shadow">
            <ul className="py-2" aria-labelledby="states-button">
              {geocodeOptions.map((geocode: GeocodeTypes, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="text-left w-full px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleSelectedGeocode(geocode)}
                  >
                    {[geocode.name, geocode.state, geocode.country]
                      .filter((field) => !!field)
                      .join(", ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button onClick={handleSubmit} disabled={!selectedGeocode}>
        Search
      </Button>
    </div>
  );
};

export default Navbar;
