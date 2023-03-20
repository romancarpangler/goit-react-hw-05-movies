import { useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const APIKEY = 'c275d705806f7faa272c6b30fd2d2038';

const api = async value => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${value}&page=1&include_adult=false`
    )
    .then(response => {
      if (response.status !== 200) {
        return new Error(response.status);
      }

      return response.data.results;
    });
};

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movie, setMovie] = useState([]);
  const name = searchParams.get('name') ?? '';
  const location = useLocation();

  const submit = e => {
    e.preventDefault();
    api(searchParams.get('name')).then(response => setMovie(response));
  };
  const g = e => {
    if (e.target.value) {
      return setSearchParams({ name: e.target.value });
    }
    setSearchParams({});
  };
  return (
    <>
      <div style={{ marginTop: 15 }}>
        <form onSubmit={submit}>
          <input value={name} onChange={g}></input>
          <button>serch</button>
        </form>
      </div>

      {movie && (
        <ul>
          {movie.map(movi => {
            return (
              <li style={{ marginTop: 10, marginBottom: 10 }} key={movi.id}>
                <Link to={`/movies/${movi.id}`} state={{ from: location }}>
                  {movi.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Movies;
