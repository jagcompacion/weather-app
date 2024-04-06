import { createSlice } from "@reduxjs/toolkit";

export const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState: {
    value: { lat: "", lon: "" },
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCoordinates } = coordinatesSlice.actions;

export default coordinatesSlice;
