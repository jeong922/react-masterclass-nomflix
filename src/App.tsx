import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/home';
import Movie from './Routes/movie';
import Search from './Routes/search';
import Tv from './Routes/tv';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HelmetProvider>
        <Helmet>
          <title>Nomflix</title>
        </Helmet>
      </HelmetProvider>
      <Routes>
        <Route path="/tv/*" element={<Tv />}></Route>
        <Route path="/search/*" element={<Search />}></Route>
        <Route path="/movies/*" element={<Movie />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
