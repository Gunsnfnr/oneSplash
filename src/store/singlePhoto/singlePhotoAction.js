import {createAsyncThunk} from '@reduxjs/toolkit';
import {singlePhotoSlice} from './singlePhotoSlice.js';
import axios from 'axios';
import {CLIENT_ID, URL_API} from '../../api/const.js';

export const singlePhotoRequestAsync = createAsyncThunk(
  'singlePhoto/fetch',
  (parameters, {dispatch, getState}) => {
    const photoId = parameters.photoId;
    const clearData = parameters.back;

    if (clearData === true) {
      dispatch(singlePhotoSlice.actions.clearData());
    }
    if (!photoId) return;

    dispatch(singlePhotoSlice.actions.singlePhotoRequest());

    return axios.get(`${URL_API}/photos/${photoId}/?client_id=${CLIENT_ID}`)
      .then(resp => {
        console.log('resp.data: ', resp.data);
        const photoData = {
          url: resp.data.urls.regular,
          author: resp.data.user.username,
          authorLink: resp.data.user.links.html,
          authorLogo: resp.data.user.profile_image.small,
          alt: resp.data.alt_description,
          likes: resp.data.likes,
          download: resp.data.links.download,
          liked_by_user: resp.data.liked_by_user,
          createdAt: resp.data.created_at,
        };

        dispatch(singlePhotoSlice.actions.singlePhotoRequestSuccess({photoData}));
      })
      .catch(error => ({error}));
  }
);
