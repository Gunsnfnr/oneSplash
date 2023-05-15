import Main from './components/Main';
import Header from './components/Header';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Main />
        </>
      }>
      </Route>
    </Routes>
  );
}

export default App;
