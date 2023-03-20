import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const APIKEY = 'c275d705806f7faa272c6b30fd2d2038';

const api = async id => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}`)
    .then(response => {
      if (response.status !== 200) {
        return new Error(response.status);
      }

      return response;
    });
};

const Cast = () => {
  const [cards, setCards] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = () => {
      api(movieId).then(response => setCards(response.data.crew));
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <ul>
        {cards.map((card, i) => (
          <li key={i} style={{ marginTop: 20 }}>
            {card.profile_path && (
              <img
                loading="lazy"
                alt="#"
                src={`https://image.tmdb.org/t/p/w300/${card.profile_path}`}
              />
            )}
            <div> Name: {card.name}</div>
            <div>Job: {card.job}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cast;

//
