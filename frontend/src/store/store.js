import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import userReducer from './userSlice';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    data: dataReducer,
  },
});

export default store;
