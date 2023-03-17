import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    lat: '',
    lon: '',
    timezone: '',
    date: null,
    display: false,
}

const searchSlice = createSlice({
    name: '@@search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload.name;
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
            state.timezone = action.payload.timezone;
            state.date = action.payload.date;
        },
        setSuggestionTrigger: (state, action) => {
            state.display = action.payload;
        },
        resetSearch: () => initialState,
    },
})

export const { setSearch, resetSearch, setSuggestionTrigger } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

//selectors
export const selectSearch = (state) => state.search.search;
export const selectSuggestionTrigger = (state) => state.search.display;
export const selectCoordinates = (state) => {
    if((state.search.lon && state.search.lat)) {
        return {
            lat: state.search.lat,
            lon: state.search.lon,
            timezone: state.search.timezone,
            date: state.search.date,
        }
    }
    return `${state.search.search}`
} 