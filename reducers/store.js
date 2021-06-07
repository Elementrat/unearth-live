import { configureStore } from '@reduxjs/toolkit';
import recorderReducer from './recorder';
import userReducer from './user';
import playerReducer from './player';

const store = configureStore({
  reducer: {
    recorder: recorderReducer,
    user: userReducer,
    player: playerReducer,
  },
});

// For fast & dirty debugging
if (typeof window !== 'undefined') window.__STORE__ = store;

export default store;
