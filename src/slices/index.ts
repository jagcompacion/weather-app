import { combineSlices } from "@reduxjs/toolkit";
import coordinatesSlice from "./coordinatesSlice";

const rootReducer = combineSlices(coordinatesSlice);

export default rootReducer;
