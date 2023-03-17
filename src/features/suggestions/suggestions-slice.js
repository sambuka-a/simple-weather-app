import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getSuggestions = createAsyncThunk(
    '@@suggestions/get-suggestions',
    async (town, {
        rejectWithValue
    }) => {
        const data = await api.fetchLocation(town)
        return data
    }
);

const initialState = {
    status: 'idle',
    error: null,
    list: [],
}

const suggestionsSlice = createSlice({
    name: '@@suggestions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSuggestions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getSuggestions.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
            })
            .addCase(getSuggestions.fulfilled, (state, action) => {
                state.status = 'received';
                state.error = null;
                state.list = action.payload.results || [];
            })
    }
})

export const suggestionsReducer = suggestionsSlice.reducer;

//selectors
export const selectSuggestions = (state) => ({
    status: state.suggestions.status,
    error: state.suggestions.error,
    list: state.suggestions.list,
})