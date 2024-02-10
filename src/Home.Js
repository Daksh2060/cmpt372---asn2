import RecipeList from "./RecipeList";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const Home = () => {

    const { data: recipes, isLoading, error } = useFetch('http://localhost:3000/recipes')

    return (
        <div className="home">
            <h2 className="saved-title">Saved Recipes</h2>
            { error && <div>{error}</div>}
            { isLoading && <div>Loading...</div> }
            { recipes && <RecipeList recipes = {recipes}/> }
            <Link to="/add">New Recipe</Link>
        </div>
    );
}
 
export default Home