import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: false,
    selectedClipIndex: null,
  },
  reducers: {
    selectClip: (state, action) => {
      state.selectedClipIndex = action.payload;
    },
    clipPlayStarted: (state) => {
      state.playing = true;
    },
    clipPlayEnded: (state) => {
      state.playing = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectClip, clipPlayStarted, clipPlayEnded } = playerSlice.actions;
export default playerSlice.reducer;
