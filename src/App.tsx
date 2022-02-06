import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import { HelmetProvider, Helmet } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HelmetProvider>
        <Helmet>
          <title>nomflix</title>
          <link
            rel="shortcut icon"
            href="https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico"
          />
        </Helmet>
      </HelmetProvider>
      <Header></Header>
      <Routes>
        <Route path="/tv/:tvId" element={<Tv />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/movies/:movieId" element={<Movie />}></Route>
        <Route path="/movies" element={<Movie />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
