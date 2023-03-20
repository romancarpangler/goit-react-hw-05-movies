import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const APIKEY = 'c275d705806f7faa272c6b30fd2d2038';

const api = async () => {
  return await axios
    .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}`)
    .then(response => {
      if (response.status !== 200) {
        return new Error(response.status);
      }

      return response.data.results;
    });
};

const Home = () => {
  const [movie, setMovie] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMovie = () => {
      api().then(response => setMovie(response));
    };
    fetchMovie();
  }, []);

  return (
    <>
      <h1>TRENDS</h1>
      <ul>
        {movie.map(movie => {
          return (
            <li style={{ marginTop: 10, marginBottom: 10 }} key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title || movie.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Home;
