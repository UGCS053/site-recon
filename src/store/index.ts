import { configureStore } from '@reduxjs/toolkit'
import layerStateReducer from './layer-slice';

const store = configureStore({
  reducer: {
    layerState: layerStateReducer
  },
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;