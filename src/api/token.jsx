// import {useEffect} from 'react';
import {CLIENT_ID,
  REDIRECT_URI,
  SECRET_KEY,
  URL_API_TOKEN} from './const.js';
import axios from 'axios';

export const getToken = (code) => {
  const searchParamsToken = new URLSearchParams('');
  searchParamsToken.append('client_id', CLIENT_ID);
  searchParamsToken.append('client_secret', SECRET_KEY);
  searchParamsToken.append('redirect_uri', REDIRECT_URI);
  searchParamsToken.append('code', code);
  searchParamsToken.append('grant_type', 'authorization_code');

  const urlAuthToken = `${URL_API_TOKEN}${searchParamsToken.toString()}`;

  console.log('urlAuthToken: ', urlAuthToken);
  // useEffect(() => {
  axios.post(urlAuthToken)
    // .then((data) => data.json())
    .then((data) => {
      console.log('dataToken: ', data);
      console.log('data.data.access_token: ', data.data.access_token);
      localStorage.setItem('bearer', data.data.access_token);
      return data.data.access_token;
    })
    .catch(err => {
      console.log('err: ', err);
    });
  // }, []);
};
