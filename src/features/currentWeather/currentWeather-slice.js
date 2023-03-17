import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getCurrentWeather = createAsyncThunk(
    '@@weather/getCurrentWeather',
    async (params, {
        rejectWithValue
    }) => {
        try {
            const data = await api.fetchWeather(params)
            return data
        } catch (err) {
            return rejectWithValue('Failed loading data...')
        }
           
    }
);

const initialState = {
    status: 'idle',
    error: null,
    weather: [],
    noLocation: null,
}

const currentWeatherSlice = createSlice({
    name: "@@currentWeather",
    initialState,
    reducers: {
        resetWeather: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCurrentWeather.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCurrentWeather.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload || 'Error loading data...'
        })
        .addCase(getCurrentWeather.fulfilled, (state, action) => {
            state.status = 'received';
            state.error = null;
            state.weather = action.payload;
        })
    }
})

export const { resetWeather } = currentWeatherSlice.actions;
export const currentWeatherReducer = currentWeatherSlice.reducer;

//selectors
export const selectCurrentWeather = (state) => ({
    status: state.currentWeather.status,
    error: state.currentWeather.error,
    current: state.currentWeather.weather.current_weather || [],
    hourly: state.currentWeather.weather.hourly || [],
    units: state.currentWeather.weather.hourly_units,
    raw: state.currentWeather.weather,
    noLocation: state.currentWeather.noLocation,
})