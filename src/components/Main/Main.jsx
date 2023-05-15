import {Route, Routes} from 'react-router-dom';
import {BiggerPicture} from '../BiggerPicture/BiggerPicture.jsx';
import {Feed} from './Feed/Feed.jsx';

export const Main = () => (
  <>
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='/picture/:id' element={<BiggerPicture />} />
    </Routes>
  </>
);

