import { useState } from 'react';

const RecipeStorage = ( {recipe} ) => {

  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div>
      <h2>Recipe Storage</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe.recipeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeStorage;