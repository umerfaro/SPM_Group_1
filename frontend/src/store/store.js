import { configureStore } from '@reduxjs/toolkit';
import someReducer from './someReducer'; // Example reducer

export const store = configureStore({
  reducer: {
    some: someReducer,
  },
});
