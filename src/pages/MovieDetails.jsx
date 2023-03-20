import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const APIKEY = 'c275d705806f7faa272c6b30fd2d2038';

const api = async id => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    )
    .then(response => {
      if (response.status !== 200) {
        return new Error(response.status);
      }

      return response;
    });
};

const MovieDetails = () => {
  const [card, setCard] = useState({});
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkHref = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovie = () => {
      api(movieId).then(response => setCard(response.data));
    };
    fetchMovie();
  }, [movieId]);

  const { title, vote_average, poster_path } = card;

  return (
    <>
      <Link
        to={backLinkHref.current}
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: 'block',
        }}
      >
        Go back
      </Link>
      <div>
        <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt="#" />
        <div>NAME: {title}</div>
        <div>GRADE: {vote_average}</div>
      </div>
      <div style={{ marginTop: 40 }}>
        <h5>Additional information</h5>
        <Link to={`/movies/${movieId}/cast `} style={{ marginRight: 20 }}>
          cast
        </Link>
        <Link to={`/movies/${movieId}/reviews`}>reviews</Link>
      </div>
      <Outlet />
    </>
  );
};
export default MovieDetails;
