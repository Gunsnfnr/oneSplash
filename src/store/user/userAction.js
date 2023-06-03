import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {userSlice} from './userSlice.js';
import {URL_API} from '../../api/const.js';

export const userRequestAsync = createAsyncThunk(
  'user/fetch',
  (parameters, {dispatch}) => {
    const clearData = parameters.clearData;
    dispatch(userSlice.actions.userRequest());
    if (clearData === true) {
      dispatch(userSlice.actions.clearData());
      return;
    }
    return axios({
      method: `get`,
      url: `${URL_API}/me`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearer')}`
      }
    }).then((data) => {
      const username = data.data.username;
      const profileImage = data.data.profile_image.medium;
      dispatch(userSlice.actions.userRequestSuccess({username, profileImage}));
    })
      .catch(error => ({error}));
  }
);
