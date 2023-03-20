import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const APIKEY = 'c275d705806f7faa272c6b30fd2d2038';

const api = async id => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${APIKEY}`)
    .then(response => {
      if (response.status !== 200) {
        return new Error(response.status);
      }

      return response;
    });
};

const Reviews = () => {
  const [cards, setCards] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = () => {
      api(movieId).then(response => setCards(response.data.results));
    };
    fetchMovie();
  }, [movieId]);

  return (
    <>
      {!cards.length && (
        <div style={{ marginTop: 20 }}>
          we don't have any reviews for this movie
        </div>
      )}
      {cards.length > 0 && (
        <ul>
          {cards.map((card, i) => (
            <li key={i}>
              <div style={{ marginBottom: 20 }}>author: {card.author}</div>
              <div>{card.content}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Reviews;

//  <ul>
//       {cards.map((card, i) => (
//       <li key={i}>
//         <div>author: {card.author}</div>
//         <div>{card.content}</div>
//       </li>
//     ))}
//   </ul>
