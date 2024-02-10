import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useNavigate } from "react-router";

const Details = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useFetch('http://localhost:3000/recipes/' + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:3000/recipes/' + recipe.id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="details">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {recipe && (
        <article>
          <h2>{recipe.name}</h2>
          <p>Ingredients: {recipe.ingredients} </p>
          <p>Steps: {recipe.steps} </p>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default Details;