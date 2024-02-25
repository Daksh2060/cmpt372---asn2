
import Home from './Home.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipe from './AddRecipe.js';
import Details from './RecipeDetails.js';
import NotFound from './NotFound.js';

function App() {
  return (
    <Router>
      <div className="App">
      <h1 className="home-title">Recipe App</h1>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/add" element={<AddRecipe />}></Route>
            <Route path="/recipes/:id" element={<Details />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;