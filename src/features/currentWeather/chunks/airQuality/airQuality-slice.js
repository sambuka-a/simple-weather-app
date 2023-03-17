import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../api/axios";

export const getAirQuality = createAsyncThunk(
    '@@airQ/getAirQuality',
    async (params, {
        rejectWithValue
    }) => {
        try {
            const data = await api.fetchAQ(params)
            return data
        } catch (err) {
            return rejectWithValue('Failed loading data...')
        }
        
    } 
);

const initialState = {
    status: 'idle',
    error: 'error',
    airQ: [],
}

const airQualitySlice = createSlice({
    name: "@@airQuality",
    initialState,
    reducers: {
        resetAirQuality: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAirQuality.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getAirQuality.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload || 'Error loading data';
        })
        .addCase(getAirQuality.fulfilled, (state, action) => {
            state.status = 'received';
            state.error = null;
            state.airQ = action.payload?.hourly;
        })
    }
})

export const { resetAirQuality } = airQualitySlice.actions;
export const airQualityReducer = airQualitySlice.reducer;

//selectors
export const selectAirQuality = (state) => ({
    status: state.airQuality.status,
    error: state.airQuality.error,
    airQ: state.airQuality.airQ,
})
