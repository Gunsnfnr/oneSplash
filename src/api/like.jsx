import axios from 'axios';
import {URL_API} from './const.js';
import {useState} from 'react';

export const sendLike = (photoId) => {
  const [isLiked, setIsLiked] = useState();
  console.log('sendLike');
  axios({
    method: 'post',
    url: `${URL_API}/photos/${photoId}/like`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('bearer')}`
    }
  }).then(resp => {
    console.log('resp.data: ', resp.data);
    setIsLiked(resp.data.photo.liked_by_user);
  }
  ).catch(err => {
    console.log('err: ', err);
  });
  console.log('isLiked: ', isLiked);
  return isLiked;
};
