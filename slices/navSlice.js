import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    locDescription: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    // push info to data layout
    reducers: {
        setOrigin: (state, action)=>{
            state.origin = action.payload;
        },
        setLocationDescription: (state, action)=>{
            state.locDescription = action.payload
        },
        setDestination: (state, action)=>{
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action)=>{
            state.travelTimeInformation = action.payload;
        } 
    }
})

export const { setOrigin, setDestination, setTravelTimeInformation, setLocationDescription } = navSlice.actions;

// Selectors - Pull info from data layout

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selecttravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectLocationDescription = (state) => state.nav.locDescription;

export default navSlice.reducer;