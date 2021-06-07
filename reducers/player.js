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
  },
});

// Action creators are generated for each case reducer function
export const { selectClip } = playerSlice.actions;
export default playerSlice.reducer;
