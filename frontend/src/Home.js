import { useEffect, useState } from "react";
import RecipeList from "./RecipeList.js";
import { useNavigate } from "react-router";

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //Retrieve list of recipes to be displayed on homepage
    useEffect(() => {

        const fetchRecipes = async () => {

            try {
                const response = await fetch('http://localhost:8080/recipes'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }

                const data = await response.json();
                setRecipes(data);
                setIsLoading(false);
            } 
            catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    //Redirect to page for adding recipes
    const handleAdd = () => {
        navigate('/add');
    }

    //Load list of recipes
    return (
        <div className="home">
            <h2 className="saved-title">Saved Recipes</h2>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {recipes && <RecipeList recipes={recipes} />}
            <div className="new">
                <button onClick={handleAdd}>ADD NEW RECIPE</button>
            </div>
        </div>
    );
}

export default Home;