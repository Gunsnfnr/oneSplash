import {useSelector} from 'react-redux';
import {ReactComponent as LoginImg} from '../../img/login.svg';
import style from './AuthIcon.module.css';

export const AuthIcon = () => {
  const profileImage = useSelector(state => state.user.profileImage);

  return (
    profileImage ?
    <img className={style.profileImg} src={profileImage} /> :
    <LoginImg className={style.LoginImg}/>
  );
};
