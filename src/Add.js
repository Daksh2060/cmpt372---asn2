import React, { useState } from 'react';
import { useNavigate } from "react-router";

const Form = ({ addRecipe }) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    const recipe = {
      recipeName: recipeName,
      ingredients: ingredients,
      steps: steps
    };

    addRecipe(recipe);
    setRecipeName('');
    setIngredients('');
    setSteps('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <textarea
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea
        placeholder="Steps (one step per line)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;