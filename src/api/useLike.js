import axios from 'axios';
import {URL_API} from './const.js';
import {useEffect, useState} from 'react';

export const useLike = (photoId) => {
  const [isLiked, setIsLiked] = useState();

  const fetchLike = (photoId) => {
    if (!photoId) return false;
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
  };
  useEffect(() => {
    fetchLike(photoId);
  }, [photoId]);

  console.log('isLiked in hook: ', isLiked);
  return [fetchLike];
};
