import axios from 'axios';
import {useEffect} from 'react';
import {URL_API} from './const.js';

export const sendLike = (photoId) => {
  useEffect(() => {
    axios.post(`${URL_API}/photos/${photoId}/like`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bearer')}`,
      },
    }).then(resp => {
      console.log('resp.data: ', resp.data);
      return resp.data;
    }
    ).catch(err => {
      console.log('err: ', err);
    });
  }, []);
};
