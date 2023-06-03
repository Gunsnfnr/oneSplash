import {createAsyncThunk} from '@reduxjs/toolkit';
import {likesSlice} from './likesSlice.js';
import axios from 'axios';
import {URL_API} from '../../api/const.js';

export const likesRequestAsync = createAsyncThunk(
  'likes/fetch',
  (parameters, {dispatch, getState}) => {
    const photoId = parameters.photoId;
    const method = parameters.method;
    dispatch(likesSlice.actions.likesRequest());
    if (!(photoId && method)) return;

    return axios({
      method: `${method}`,
      url: `${URL_API}/photos/${photoId}/like`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearer')}`
      }
    }).then(resp => {
      console.log('resp.data: ', resp.data);
      const isLiked = resp.data.photo.liked_by_user;
      const totalLikes = resp.data.photo.likes;
      dispatch(likesSlice.actions.likesRequestSuccess({isLiked, totalLikes}));
      // setIsLiked(resp.data.photo.liked_by_user);
      // setTotalLikes(resp.data.photo.likes);
    }
    )
      .catch(error => ({error}));
  }
);

