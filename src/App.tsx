import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import Movie from './Routes/Movie';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState } from 'react';

function App() {
  const [id, setId] = useState(Number);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HelmetProvider>
        <Helmet>
          <title>Nomflix</title>
        </Helmet>
      </HelmetProvider>
      <Routes>
        <Route path='/tv/*' element={<Tv setId={setId} />}></Route>
        <Route
          path='/search'
          element={<Search id={id} setId={setId} />}
        ></Route>
        <Route path='/movies/*' element={<Movie setId={setId} />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
