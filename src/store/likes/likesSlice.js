import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLiked: false,
  totalLikes: '',
  error: '',
  payload: '',
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    likesRequest: (state) => {
      state.error = '';
    },
    likesRequestSuccess: (state, action) => {
      state.error = '';
      state.isLiked = action.payload.isLiked;
      state.totalLikes = action.payload.totalLikes;
    },
    likesRequestError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export default likesSlice.reducer;
