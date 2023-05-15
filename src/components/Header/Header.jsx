import style from './Header.module.css';
import {ReactComponent as LogoImg} from './img/logo-black.svg';
import {Auth} from './Auth/Auth.jsx';
import {Link} from 'react-router-dom';

export const Header = () =>
  (
    <>
      <div className={style.container}>
        <Link to='/'>
          <LogoImg width={32} height={32} />
        </Link>
        <Auth />
      </div>
    </>
  );

