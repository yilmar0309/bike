import { configureStore } from '@reduxjs/toolkit';
import bike from './bikeSlice';

export default configureStore({
  reducer: {
    bike,
  },
  devTools: true,
});
