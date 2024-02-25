import { useEffect, useState } from "react";
import RecipeList from "./RecipeList.js";
import { useNavigate } from "react-router";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleAdd = () => {
        navigate('/add');
    }

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