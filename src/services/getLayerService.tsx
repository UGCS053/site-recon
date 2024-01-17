import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLayerService = createAsyncThunk('getLayer/get', async () => {
    const targetUrl = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
    try {
        const data = await axios.get(targetUrl)
        return data.data;
    } catch (err) {
        console.log('error from layer service')
        throw err;
    }
});

