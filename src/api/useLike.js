import axios from 'axios';
import {URL_API} from './const.js';
import {useState} from 'react';

export const useLike = (photoId) => {
  if (!photoId) return;
  const [isLiked, setIsLiked] = useState(false);
  console.log('useLike');
  photoId && axios({
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
