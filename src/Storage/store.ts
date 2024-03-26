import { configureStore } from "@reduxjs/toolkit";
import { registerReducer } from "./Redux/authSlice";
import authApi from "../Api/authApi";

const store:any = configureStore({
  reducer: {
    registerStore: registerReducer,  
    [authApi.reducerPath]: authApi.reducer,     

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)    
});

export type RootState = ReturnType<typeof store.getState>;
export default store;