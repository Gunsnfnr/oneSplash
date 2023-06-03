import style from './Auth.module.css';
import {ReactComponent as LoginImg} from '../img/login.svg';
import {urlAuth} from '../../../api/auth.js';
// import {getToken} from '../../../api/token';
import {useEffect, useState} from 'react';
import {getCode} from '../../../api/code.js';
import {useDispatch, useSelector} from 'react-redux';
import {tokenRequestAsync} from '../../../store/token/tokenAction.js';
import {userRequestAsync} from '../../../store/user/userAction.js';
import {AuthIcon} from './AuthIcon/AuthIcon.jsx';
import {Link} from 'react-router-dom';

export const Auth = () => {
  const code = getCode();
  const token = useSelector(state => state.token.token) || localStorage.getItem('bearer');
  const username = useSelector(state => state.user.username);
  // const profileImage = useSelector(state => state.user.profileImage);
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);


  useEffect(() => {
    if (token !== '') {
      if (localStorage.getItem('bearer') && !username) {
        dispatch(userRequestAsync({clearData: false}));
      }
    }
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      if (window.location.toString().includes('code') && !localStorage.getItem('bearer')) {
        dispatch(tokenRequestAsync({code, deleteToken: false}));
      }
    }, 1000);
  }, [window.location.pathname]);

  const logoutHandler = () => {
    dispatch(userRequestAsync({clearData: true}));
    dispatch(tokenRequestAsync({code: undefined, deleteToken: true}));
  };


  if (!token) return <a className={style.login} href={urlAuth}>Log in</a>;

  return !username ? (<LoginImg className={style.LoginImg}/>) : (
    token && <div className={style.container}>
      <button className={style.btn} onClick={() => {
        setVisible(!isVisible);
      }}>
        <div className={style.cont}>
          <AuthIcon/>
          <p>{username}</p>
        </div>
      </button>
      {(isVisible ?
        <Link to='/'>
          <button className={style.logout} onClick={() => logoutHandler()}>Logout</button>
        </Link> :
      <button className={style.logoutInvisible}>Logout</button>
      )}
    </div>
    );
};

