import style from './BiggerPicture.module.css';
import redHeartIcon from './img/icon_heart_1.png';
import heartIcon from './img/icon_heart_2.png';
import backIcon from './img/back.svg';
import {Link, useLocation} from 'react-router-dom';
import React, {useEffect} from 'react';
// import {CLIENT_ID, URL_API} from '../../api/const.js';
// import axios from 'axios';
// import {useState} from 'react';
// import {useLike} from '../../hooks/useLike.js';
import {useDispatch, useSelector} from 'react-redux';
import {singlePhotoRequestAsync} from '../../store/singlePhoto/singlePhotoAction.js';
import {likesRequestAsync} from '../../store/likes/likesAction.js';
import formatDate from '../../utils/formatDate.js';

export const BiggerPicture = () => {
  const location = useLocation();

  const photoUrl = useSelector(state => state.singlePhoto.photoData.url);
  const photoLiked = useSelector(state => state.singlePhoto.photoData.liked_by_user);
  let photoLikes = useSelector(state => state.singlePhoto.photoData.likes);
  const photoAuthor = useSelector(state => state.singlePhoto.photoData.author);
  const photoAuthorLink = useSelector(state => state.singlePhoto.photoData.authorLink);
  const photoAuthorLogo = useSelector(state => state.singlePhoto.photoData.authorLogo);
  const photoAlt = useSelector(state => state.singlePhoto.photoData.alt);
  const photoDownload = useSelector(state => state.singlePhoto.photoData.download);
  let createdAt = useSelector(state => state.singlePhoto.photoData.createdAt);
  const isLiked = useSelector(state => state.likes.isLiked);
  const totalLikes = useSelector(state => state.likes.totalLikes);
  const dispatch = useDispatch();

  if (totalLikes) {
    photoLikes = totalLikes;
  }

  if (createdAt) {
    createdAt = formatDate(createdAt);
  }

  useEffect(() => {
    dispatch(singlePhotoRequestAsync({photoId: location.state.id, back: false}));
  }, []);

  const handleClick = () => {
    const method = (isLiked || photoLiked) ? 'delete' : 'post';
    localStorage.getItem('bearer') &&
    dispatch(likesRequestAsync({photoId: location.state.id, method}));
  };

  const backHandler = () => {
    dispatch(singlePhotoRequestAsync({photoId: undefined, back: true}));
  };

  return (
    <div className={style.container}>
      <div className={style.upper_container}>
        <Link to='/'>
          <div className={style.backContainer} onClick={backHandler}>
            <img className={style.backIcon} src={backIcon}/>
            <span className={style.back}>Back to gallery</span></div>
        </Link>
        <div className={style.handlePhotoContainer}>
          <div className={
            `${(isLiked || photoLiked) ?
              style.likes_liked : style.likes} ${localStorage.getItem('bearer') ?
              style.activeLink : style.inactive}`
          } onClick={handleClick}>
            <img className={style.icon}
              src={(isLiked || photoLiked) ?
                redHeartIcon : heartIcon}
            />
            <span className={style.likesNumber}>{photoLikes}</span>
          </div>
          <a href={photoDownload} title='download' target='_blank' rel="noreferrer">
            <div className={style.download}>
              <div className={style.arrow}><div className={style.stripe}></div></div>
              {/* <DwnldImg className={style.download} width={36} height={36} /> */}
            </div></a>
        </div>
      </div>
      <img className={style.photo}
        src={photoUrl}
        alt={photoAlt}
        title={photoAlt} />
      <div className={style.lower_container}>
        <div className={style.author_container}>
          <a href={photoAuthorLink}
            target='_blank'
            rel="noreferrer"
            className={style.author_icon}>
            <img src={photoAuthorLogo} />
          </a>
          <a className={style.author}
            href={photoAuthorLink}
            target='_blank'
            rel="noreferrer">{photoAuthor}</a>
        </div>
        <span className={style.date}>{createdAt}</span>
      </div>
    </div>
  );
};
