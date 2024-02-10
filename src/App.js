import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Storage from './Storage';
import Form from './Add';

function App() {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Storage recipes={recipes} />} />
            <Route
              exact
              path="/Add"
              element={<Form addRecipe={addRecipe} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
