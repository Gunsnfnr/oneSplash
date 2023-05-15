import style from './BiggerPicture.module.css';
// import img01 from '../Main/Feed/img/01 simon-wilkes-S297j2CsdlM-unsplash.jpg';
// import img02 from '../Main/Feed/img/02 hanvin-cheong-h3P5sbqKhus-unsplash.jpg';
import redHeartIcon from './img/icon_heart_1.png';
import heartIcon from './img/icon_heart_2.png';
// import {ReactComponent as DwnldImg} from './img/dwnld.svg';
// import PropTypes from 'prop-types';
// import athrLogo from './img/profile-1.avif';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {CLIENT_ID, URL_API} from '../../api/const.js';
import axios from 'axios';
import {useState} from 'react';
import {sendLike} from '../../api/like.jsx';

export const BiggerPicture = () => {
  const [photoData, setPhotoData] = useState({});
  const location = useLocation();

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
    console.log(1);
    const receiveLikeData = sendLike(location.state.id);
    console.log('receiveLikeData: ', receiveLikeData);
  };

  // if (publishPhoto) {
  //   console.log('publishPhoto+photoData: ', photoData);
  // }

  return (
    <div className={style.container}>
      <div className={style.upper_container}>
        <div className={
          `${photoData.liked_by_user ?
            style.likes_liked : style.likes} ${localStorage.getItem('bearer') ?
            style.activeLink : style.inactive}`
        } onClick={handleClick}>
          <img className={style.icon}
            src={photoData.liked_by_user ? redHeartIcon : heartIcon}
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
