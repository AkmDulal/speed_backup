import { combineReducers } from "@reduxjs/toolkit";
import {
  addressLatLngSlice,
  addressSlice,
  cartSlice,
  countryCityLatLngSlice,
  countryCitySlice,
  customerInformation,
  foodListStore,
  restaurantsLatLngSlice,
} from "./slice/globalDataSlice";

export const rootReducer = combineReducers({
  customerInformation: customerInformation?.reducer,
  addressLatLngSlice: addressLatLngSlice?.reducer,
  addressSlice: addressSlice?.reducer,
  countryCitySlice: countryCitySlice?.reducer,
  cart: cartSlice?.reducer,
  foods: foodListStore?.reducer,
  restaurantsLatLngSlice: restaurantsLatLngSlice?.reducer,
  countryCityLatLngSlice: countryCityLatLngSlice?.reducer,
});
