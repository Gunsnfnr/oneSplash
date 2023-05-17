import axios from 'axios';
// import {useEffect} from 'react';
import {URL_API} from './const.js';
import {useState} from 'react';

// const headers = {
//   Authorization: `Bearer ${localStorage.getItem('bearer')}`,
// };

export const sendLike = (photoId) => {
  let isLiked = undefined;
  const [callEnded, setCallended] = useState(false);
  console.log('sendLike');
  // useEffect(() => {
  axios({
    method: 'post',
    url: `${URL_API}/photos/${photoId}/like`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('bearer')}`
    }
  }).then(resp => {
    setCallended(true);
    console.log('resp.data: ', resp.data);
    isLiked = resp.data.photo.liked_by_user;
    console.log('isLiked: ', isLiked);
  }
  ).catch(err => {
    setCallended(true);
    console.log('err: ', err);
  });
  // }, []);
  console.log('isLiked: ', isLiked);
  if (callEnded) {
    return isLiked;
  }
};
