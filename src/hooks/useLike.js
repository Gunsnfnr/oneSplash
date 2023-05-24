import axios from 'axios';
import {URL_API} from '../api/const.js';
import {useEffect, useState} from 'react';

export const useLike = (photoId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState();

  const fetchLike = (photoId, method) => {
    if (!photoId) return false;
    axios({
      method: `${method}`,
      url: `${URL_API}/photos/${photoId}/like`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bearer')}`
      }
    }).then(resp => {
      console.log('resp.data: ', resp.data);
      setIsLiked(resp.data.photo.liked_by_user);
      setTotalLikes(resp.data.photo.likes);
    }
    ).catch(err => {
      console.log('err: ', err);
    });
  };
  useEffect(() => {
    fetchLike(photoId);
  }, [photoId]);

  console.log('fetchLike, isLiked, totalLikes: ', fetchLike, isLiked, totalLikes);
  return [fetchLike, isLiked, totalLikes];
};
