import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const backLinkHref = location.state?.from ?? '/movies';
  console.log(location.state);
  useEffect(() => {
    const fetchMovie = () => {
      api(movieId).then(response => setCard(response.data));
    };
    fetchMovie();
  }, []);
  const { title, vote_average, poster_path } = card;

  return (
    <>
      <Link to={backLinkHref}>Go back</Link>
      <div>
        <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt="#" />
        <div>NAME: {title}</div>
        <div>GRADE: {vote_average}</div>
      </div>
    </>
  );
};
export default MovieDetails;
