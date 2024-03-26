import { createSlice } from "@reduxjs/toolkit";
import userModel from "../../Interfaces/userModel";

export const emptyUserState : userModel = {
    email: "",
  password: "",
  verificationToken: "",
  isVerified: false,
  resetPasswordToken: "",
  resetPasswordTokenExpiresAt: ""  
};

export const authSlice = createSlice({
    name:"userAuth",
    initialState:emptyUserState,
    reducers:{
        setLoggedInUser: (state, action) =>{
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.verificationToken = action.payload.verificationToken;
            state.isVerified = action.payload.isVerified;
            state.resetPasswordToken = action.payload.resetPasswordToken;
            state.resetPasswordTokenExpiresAt = action.payload.resetPasswordTokenExpiresAt;
        },        
    },
});

export const {setLoggedInUser} = authSlice.actions;
export const registerReducer = authSlice.reducer;