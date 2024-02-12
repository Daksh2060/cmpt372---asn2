import RecipeList from "./RecipeList";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate();
    const { data: recipes, isLoading, error } = useFetch('http://localhost:3000/recipes')

    const handleAdd = () => {
        navigate('/add');
    }

    return (
        <div className="home">
            <h2 className="saved-title">Saved Recipes</h2>
            { error && <div>{error}</div>}
            { isLoading && <div>Loading...</div> }
            { recipes && <RecipeList recipes = {recipes}/> }
            <div className="new">
                <button onClick={handleAdd}>ADD NEW RECIPE</button>
            </div>  
        </div>
    );
}
 
export default Home