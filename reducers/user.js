import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    clips: [],
  },
  reducers: {
    saveClip: (state, action) => {
      state.clips.push(
        action.payload,
      );
    },

    beginClipUpload: (state, action) => {
      state.clips = state.clips.map((clip, index) => (index === action.payload ? {
        ...clip,
        syncStatus: 'uploading',
      } : clip));
    },

    finishClipUpload: (state, action) => {
      state.clips = state.clips.map((clip, index) => (index === action.payload ? {
        ...clip,
        syncStatus: 'uploaded',
      } : clip));
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveClip, beginClipUpload, finishClipUpload } = userSlice.actions;
export default userSlice.reducer;
