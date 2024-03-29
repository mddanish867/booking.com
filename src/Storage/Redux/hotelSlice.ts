import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addHotel:[]
};

export const hotelSlice = createSlice({
    name:"AddHotels",
    initialState:initialState,
    reducers:{
        setAddHotel: (state, action) =>{
            state.addHotel = action.payload;
        },        
    },
});

export const {setAddHotel} = hotelSlice.actions;
export const addHotelReducer = hotelSlice.reducer;