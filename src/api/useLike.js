import axios from 'axios';
import {URL_API} from './const.js';
import {useEffect, useState} from 'react';

export const useLike = (photoId) => {
  // if (!photoId) return;
  const [isLiked, setIsLiked] = useState();

  console.log('useLike');
  const fetchLike = (photoId) => {
    if (!photoId) return;
    axios({
      method: 'post',
      url: `${URL_API}/photos/${photoId}/like`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearer')}`
      }
    }).then(resp => {
      console.log('resp.data: ', resp.data);
      const oopp = setIsLiked(resp.data.photo.liked_by_user);
      console.log('oopp: ', oopp);
    }
    ).catch(err => {
      console.log('err: ', err);
    });
  };
  useEffect(() => {
    fetchLike(photoId);
  }, [photoId]);

  console.log('isLiked: ', isLiked);
  return [fetchLike];
};
