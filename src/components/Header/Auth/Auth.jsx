import style from './Auth.module.css';
import {ReactComponent as LoginImg} from '../img/login.svg';
import {urlAuth} from '../../../api/auth.js';
import {getToken} from '../../../api/token.jsx';
import {useEffect, useState} from 'react';


export const Auth = () => {
  const [isToken, setIstoken] = useState(false);
  if (!isToken) {
    if (localStorage.getItem('bearer')) {
      setIstoken(true);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      if (window.location.toString().includes('code')) {
        if (localStorage.getItem('bearer')) {
          setIstoken(true);
        }
      }
    }, 1000);
  }, [window.location.pathname]);

  if (!isToken) return (<a className={style.login} href={urlAuth}>Log in</a>);

  return (
    <LoginImg className={style.LoginImg}/>
    // localStorage.getItem('bearer') ?
    //     <LoginImg className={style.LoginImg}/> :
    //  <a className={style.login} href={urlAuth}>Log in</a>
  );
};


// move to other component ?
let code = null;

export const getCode = () => {
  if (location.href.includes('code=')) {
    code = location.href.split('code=')[1];
  }

  if (code) {
    console.log('code: ', code);
  }
  return code;
};

getCode();

if (code) {
  const token = getToken(code);
  if (token) {
    console.log('token: ', token);
  }
}
