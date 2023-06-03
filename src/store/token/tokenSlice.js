import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  error: '',
  payload: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenRequest: (state) => {
      state.error = '';
    },
    tokenRequestSuccess: (state, action) => {
      state.error = '';
      state.token = action.payload.token;
    },
    tokenRequestError: (state, action) => {
      state.error = action.payload.error;
    },
    deleteToken: (state, action) => {
      state.error = '';
      state.token = '';
    },
  },
});

export default tokenSlice.reducer;
