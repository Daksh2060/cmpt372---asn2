import { Link } from "react-router-dom";

const RecipeList = (props) => {

    const recipes = props.recipes

    return (
        <div className="recipe-list">
            <h2>{props.title}</h2>
            {recipes.map((recipe) => (
                <div className="recipe-preview" key = {recipe.id}>
                    <Link to = {`/recipes/${recipe.id}`}>
                        <h2>{recipe.ticker}</h2>
                    </Link>
                </div> 
            ))}
        </div>
    );
}

export default RecipeList;