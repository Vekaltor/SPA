import { combineReducers } from "@reduxjs/toolkit";

import productsSlice from "../features/products/productsSlice";

export const rootReducer = combineReducers({
  products: productsSlice,
});
