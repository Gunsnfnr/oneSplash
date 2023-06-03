import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  photoData: {},
  error: '',
  payload: '',
};

export const singlePhotoSlice = createSlice({
  name: 'singlePhoto',
  initialState,
  reducers: {
    singlePhotoRequest: (state) => {
      state.error = '';
    },
    singlePhotoRequestSuccess: (state, action) => {
      state.error = '';
      state.photoData = action.payload.photoData;
    },
    singlePhotoRequestError: (state, action) => {
      state.error = action.payload.error;
    },
    clearData: (state, action) => {
      state.error = '';
      state.photoData = '';
    },
  },
});

export default singlePhotoSlice.reducer;
