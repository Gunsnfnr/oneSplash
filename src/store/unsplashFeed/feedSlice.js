import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  newPhotos: [],
  error: '',
  payload: '',
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedRequest: (state) => {
      state.error = '';
    },
    feedRequestSuccess: (state, action) => {
      state.error = '';
      state.newPhotos = [...state.newPhotos, ...action.payload.newPhotos];
    },
    feedRequestError: (state, action) => {
      state.error = action.payload.error;
    },
    clearPhotos: (state, action) => {
      state.error = '';
      state.newPhotos = [];
    },
  },
});

export default feedSlice.reducer;
