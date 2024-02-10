import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Details = () => {
  const { id } = useParams();
  const { data: stock, isLoading, error } = useFetch('http://localhost:3000/stocks/' + id);
  const navigate = useNavigate();
  const [currentPrice, setCurrentPrice] = useState(null);

  const handleClick = () => {
    fetch('http://localhost:3000/stocks/' + stock.id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    });
  };

  useEffect(() => {
    if (stock && stock.price !== null && stock.price !== undefined) {
      setCurrentPrice(stock.price);
    }
  }, [stock]);

  return (
    <div className="details">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {stock && (
        <article>
          <h2>{stock.title}</h2>
          <p>Ticker: {stock.ticker} </p>
          <p>Price: {currentPrice !== null ? currentPrice : 'N/A'} </p>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default Details;