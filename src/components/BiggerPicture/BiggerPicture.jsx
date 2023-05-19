import style from './BiggerPicture.module.css';
import redHeartIcon from './img/icon_heart_1.png';
import heartIcon from './img/icon_heart_2.png';
// import {ReactComponent as DwnldImg} from './img/dwnld.svg';
// import athrLogo from './img/profile-1.avif';
import {useLocation} from 'react-router-dom';
import React, {useEffect} from 'react';
import {CLIENT_ID, URL_API} from '../../api/const.js';
import axios from 'axios';
import {useState} from 'react';
import {useLike} from '../../api/useLike.js';

export const BiggerPicture = () => {
  const [photoData, setPhotoData] = useState({});
  const [isPhotoLiked] = useLike();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/photos/${location.state.id}/?client_id=${CLIENT_ID}`).then(resp => {
      console.log('resp.data: ', resp.data);
      const photoInfo = {
        url: resp.data.urls.regular,
        author: resp.data.user.username,
        authorLink: resp.data.user.links.html,
        authorLogo: resp.data.user.profile_image.small,
        alt: resp.data.alt_description,
        likes: resp.data.likes,
        download: resp.data.links.download,
        liked_by_user: resp.data.liked_by_user,
      };
      setPhotoData(photoInfo);
      return photoData;
    })
      .catch(err => {
        console.log('err: ', err);
      });
  }, []);

  const handleClick = () => {
    console.log('isLiked: ', isLiked);
    const logger = setIsLiked(isPhotoLiked(location.state.id));
    console.log('logger.isPhotoLiked(location.state.id): ', logger);
  };

  console.log('isLiked in BiggerPicture: ', isLiked);

  return (
    <div className={style.container}>
      <div className={style.upper_container}>
        <div className={
          `${(isLiked || photoData.liked_by_user) ?
            style.likes_liked : style.likes} ${localStorage.getItem('bearer') ?
            style.activeLink : style.inactive}`
        } onClick={handleClick}>
          <img className={style.icon}
            src={(isLiked || photoData.liked_by_user) ?
              redHeartIcon : heartIcon}
          />
          <span className={style.likesNumber}>{photoData.likes}</span>
        </div>
        <a href={photoData.download} title='download' target='_blank' rel="noreferrer">
          <div className={style.download}>
            <div className={style.arrow}><div className={style.stripe}></div></div>
            {/* <DwnldImg className={style.download} width={36} height={36} /> */}
          </div></a>
      </div>
      <img className={style.photo}
        src={photoData.url}
        alt={photoData.alt}
        title={photoData.alt} />
      <div className={style.lower_container}>
        <a href={photoData.authorLink}
          target='_blank'
          rel="noreferrer"
          className={style.author_icon}>
          <img src={photoData.authorLogo} />
        </a>
        <a className={style.author}
          href={photoData.authorLink}
          target='_blank'
          rel="noreferrer">{photoData.author}</a>
      </div>
    </div>
  );
};
