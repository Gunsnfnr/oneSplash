import style from './Feed.module.css';
import {ReactComponent as DwnldImg} from './img/dwnld.svg';
import {Link} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import Masonry from 'react-masonry-component';
// import {getPhotos} from '../../../hooks/getPhotos.js';
import {feedRequestAsync} from '../../../store/unsplashFeed/feedAction.js';
import {useDispatch, useSelector} from 'react-redux';

export const Feed = () => {
  // const loadedPosts = useSelector(state => state.postsData.posts);
  const photosData = useSelector(state => state.feed.newPhotos);
  const dispatch = useDispatch();
  let page = 1;
  const masonryOptions = {
    transitionDuration: 0
  };

  const endList = useRef(null);
  // const [fetchPhotos, newPhotos] = getPhotos();
  // const [photosData, setPhotosData] = useState([]);

  useEffect(() => {
    dispatch(feedRequestAsync({page, clearPhotos: false}));
    // fetchPhotos(page);
  }, []);

  // useEffect(() => {
  //   console.log('newPhotos: ', newPhotos);
  //   newPhotos && setPhotosData([...photosData, ...newPhotos]);
  // }, [newPhotos]);
  const handleClick = () => {
    dispatch(feedRequestAsync({page: undefined, clearPhotos: true}));
  };

  useEffect(() => {
    setTimeout(() => {
      if (photosData === []) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          ++page;
          dispatch(feedRequestAsync({page, clearPhotos: false}));
        }
      }, {
        rootMargin: '100px',
      });
      observer.observe(endList.current);
      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }, 3000);
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
              <Link to={`/picture/${photo.id}`} state={{id: photo.id}} onClick={handleClick}>
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
        <li ref={endList} className={style.end}/>
      </Masonry>
    </ul>
  );
};
