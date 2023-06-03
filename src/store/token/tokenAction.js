import {createAsyncThunk} from '@reduxjs/toolkit';
import {CLIENT_ID, REDIRECT_URI, SECRET_KEY, URL_API_TOKEN} from '../../api/const.js';
import axios from 'axios';
import {tokenSlice} from './tokenSlice.js';

export const tokenRequestAsync = createAsyncThunk(
  'token/fetch', (parameters, {dispatch}) => {
    const code = parameters.code;
    const deleteToken = parameters.deleteToken;

    if (deleteToken === true) {
      localStorage.setItem('bearer', '');
      dispatch(tokenSlice.actions.deleteToken());
    }
    if (!code) return;

    const searchParamsToken = new URLSearchParams('');
    searchParamsToken.append('client_id', CLIENT_ID);
    searchParamsToken.append('client_secret', SECRET_KEY);
    searchParamsToken.append('redirect_uri', REDIRECT_URI);
    searchParamsToken.append('code', code);
    searchParamsToken.append('grant_type', 'authorization_code');

    const urlAuthToken = `${URL_API_TOKEN}${searchParamsToken.toString()}`;
    dispatch(tokenSlice.actions.tokenRequest());

    return !localStorage.getItem('bearer') && axios.post(urlAuthToken)
      .then((data) => {
        localStorage.setItem('bearer', data.data.access_token);
        const token = data.data.access_token;
        dispatch(tokenSlice.actions.tokenRequestSuccess({token}));
      })
      .catch(error => ({error}));
  }
);
