// Storage.js
import React from 'react';

const Storage = ({ recipes }) => {
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

export default Storage;