import { configureStore } from "@reduxjs/toolkit";
import { registerReducer } from "./Redux/authSlice";
import authApi from "../Api/authApi";
import hotelApi from "../Api/hotelAPI";
import { addHotelReducer, } from "./Redux/hotelSlice";

const store:any = configureStore({
  reducer: {
    registerStore: registerReducer,  
    [authApi.reducerPath]: authApi.reducer, 
    hotelStore: addHotelReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)    
      .concat(hotelApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;