import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";


const Details = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useFetch('http://localhost:3000/recipes/' + id);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
    }
  }, [recipe]);

  const handleDelete = () => {
    fetch('http://localhost:3000/recipes/' + id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = { name, ingredients, steps };
    setIsPending(true);
    fetch('http://localhost:3000/recipes/' + id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe)
    }).then(() => {
      console.log("Recipe updated");
      setIsPending(false);
      navigate('/');
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="details">
      {isEditing ? (
      <div className="create">
        <h2>Add a New Recipe</h2>
        <form className="recipe-form" onSubmit={handleSubmit}>
          <label className="recipe-name-label">Recipe Name:</label>
          <input className="recipe-name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label className="recipe-ingredients-label">Recipe Ingredients</label>
          <textarea className="recipe-ingredients-input" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />

          <label className="recipe-steps-label">Recipe Steps</label>
          <textarea className="recipe-steps-input" value={steps} onChange={(e) => setSteps(e.target.value)} />

          { !isPending && <button>Save</button> }
          { isPending && <button disabled>Saving Recipe...</button> }
        </form>
      </div>
      ) : (
        <div>
          <h2 className="recipe-name">{recipe.name}</h2>
          <p className="recipe-ingredients">Ingredients: {recipe.ingredients}</p>
          <p className="recipe-steps">Steps: {recipe.steps}</p>
          <button className="recipe-edit" onClick={handleEdit}>Edit</button>
          <button className="recipe-delete" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Details;