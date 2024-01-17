import { createSlice } from '@reduxjs/toolkit';
import { getLayerService } from '../services/getLayerService';

export const layerStateSlice = createSlice({
    name: 'layerState',
    initialState: {
        layerData: [],
        isLoading: false,
        error: ""
    },
    reducers: {
        setLayerData: (state, action) => {
            state.layerData = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getLayerService.fulfilled, (state, action) => {
            const response = action.payload;
            if (response) {
                return {
                    ...state,
                    isLoading: false,
                    layerData: response
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                    error: "error loading data"
                };
            }
        });
        builder.addCase(getLayerService.pending, (state, action) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getLayerService.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: "get layer data request failed"
            };
        });
    }
});

export const { setLayerData } = layerStateSlice.actions;
export default layerStateSlice.reducer;
