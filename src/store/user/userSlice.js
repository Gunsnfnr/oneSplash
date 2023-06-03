import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  profileImage: '',
  error: '',
  payload: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequest: (state) => {
      state.error = '';
    },
    userRequestSuccess: (state, action) => {
      state.error = '';
      state.username = action.payload.username;
      state.profileImage = action.payload.profileImage;
    },
    userRequestError: (state, action) => {
      state.error = action.payload.error;
    },
    clearData: (state, action) => {
      state.username = '';
      state.profileImage = '';
    },
  },
});

export default userSlice.reducer;
