import style from './Feed.module.css';
import {ReactComponent as DwnldImg} from './img/dwnld.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {CLIENT_ID, URL_API} from '../../../api/const.js';
import {useEffect, useState} from 'react';
// `${URL_API}/users/ellienelie/photos/?client_id=${CLIENT_ID}`
import Masonry from 'react-masonry-component';

export const Feed = () => {
  const masonryOptions = {
    transitionDuration: 0
  };
  const [photosData, setPhotosData] = useState([]);
  useEffect(() => {
    axios.get(`${URL_API}/photos/?per_page=30&client_id=${CLIENT_ID}`).then(resp => {
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
  }, []);

  return (
    <ul className={style.container}>
      <Masonry options={masonryOptions}
        updateOnEachImageLoad={true}
        elementType={'ul'}
      >
        {
          (photosData.map((photo) => (
            <li className={style.element} key={photo.id}>
              {/* <Link to='/picture' state={{id: photo.id}}> */}
              <Link to={`/picture/${photo.id}`} state={{id: photo.id}}>
                <img className={style.photo}
                  src={photo.url}
                  title={photo.alt}
                  alt={photo.alt} />
              </Link>
              <a href={photo.authorLink}
                target="_blank"
                rel="noreferrer"
                className={style.author_icon}>
                <img src={photo.authorLogo} />
              </a>
              <button className={style.like}>{photo.likes}</button>
              <a target='_blank' rel="noreferrer" href={photo.download}>
                <DwnldImg className={style.download} width={36} height={36} /></a>
            </li>
          )
          ))
        }
      </Masonry>
    </ul>
  );
};
