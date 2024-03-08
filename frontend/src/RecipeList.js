import { Link } from "react-router-dom";

//Hold the list of recipes shown on the homepage
const RecipeList = (props) => {
    
    const recipes = props.recipes
    return (
        <div className="recipe-list">
            <h2>{props.title}</h2>
            {recipes.map((recipe) => (
                <div className="recipe-preview" key = {recipe.id}>
                    <Link to = {`/recipes/${recipe.id}`}>
                        <h2>{recipe.name}</h2>
                    </Link>
                </div> 
            ))}
        </div>
    );
}

export default RecipeList;