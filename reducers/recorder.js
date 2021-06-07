import { createSlice } from '@reduxjs/toolkit';

export const recorderSlice = createSlice({
  name: 'recorder',
  initialState: {
    recording: false,
  },
  reducers: {
    setRecording: (state, action) => {
      state.recording = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecording } = recorderSlice.actions;
export default recorderSlice.reducer;
