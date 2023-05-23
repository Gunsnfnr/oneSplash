import axios from 'axios';
import {useState} from 'react';
import {CLIENT_ID, URL_API} from './const.js';

export const getPhotos = () => {
  const [photosData, setPhotosData] = useState([]);

  const fetchPhotos = (page) => {
    if (!page) return;
    axios.get(`${URL_API}/photos/?per_page=30&client_id=${CLIENT_ID}&page=${page}`).then(resp => {
      console.log('resp.data: ', resp.data);
      const photosInfo = [];
      for (let i = 0; i < resp.data.length; i++) {
        photosInfo[i] = {
          url: resp.data[i].urls.small,
          author: resp.data[i].user.username,
          authorLink: resp.data[i].user.links.html,
          authorLogo: resp.data[i].user.profile_image.small,
          alt: resp.data[i].alt_description,
          likes: resp.data[i].likes,
          id: resp.data[i].id,
          download: resp.data[i].links.download,
        };
      }
      console.log();
      setPhotosData(photosInfo);
      return photosData;
    })
      .catch(err => {
        console.log('err: ', err);
      });
  };

  return [fetchPhotos, photosData];
};
