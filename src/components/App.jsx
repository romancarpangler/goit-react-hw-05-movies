import { Routes, Route, Link } from 'react-router-dom';
import Home from 'pages/Home';
import MovieDetails from 'pages/MovieDetails';
import Movies from 'pages/Movies';
import Cast from './Cast';
import Reviews from './Reviews';

export const App = () => {
  return (
    <>
      <div>
        <span
          style={{
            marginRight: 15,
          }}
        >
          <Link to="/">home</Link>
        </span>
        <span>
          <Link to="/movies">Movies</Link>
        </span>
        <div />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="/movies/:movieId/cast" element={<Cast />}></Route>
            <Route
              path="/movies/:movieId/reviews"
              element={<Reviews />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};
