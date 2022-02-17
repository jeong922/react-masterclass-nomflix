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
        </Helmet>
      </HelmetProvider>
      <Header />
      <Routes>
        <Route path="/tv/*" element={<Tv />}></Route>
        <Route path="/search/*" element={<Search />}></Route>
        <Route path="/movies/*" element={<Movie />}></Route>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
