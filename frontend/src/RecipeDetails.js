import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/recipes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                return response.json();
            })
            .then(data => {
                setRecipe(data);
                setName(data.name);
                setIngredients(data.ingredients);
                setSteps(data.steps);
            })
            .catch(error => console.error('Error fetching recipe:', error));
    }, [id]);

    const handleDelete = () => {
        fetch(`http://localhost:8080/recipes/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                navigate('/');
            })
            .catch(error => console.error('Error deleting recipe:', error));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleHome = () => {
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRecipe = { name, ingredients, steps };
        setIsPending(true);
        fetch(`http://localhost:8080/recipes/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedRecipe)
        })
            .then(() => {
                console.log("Recipe updated");
                setIsPending(false);
                setIsEditing(false);
                // Update the recipe state with the new values
                setRecipe(prevRecipe => ({
                    ...prevRecipe,
                    name,
                    ingredients,
                    steps
                }));
            })
            .catch(error => console.error('Error updating recipe:', error));
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="details">
            {isEditing ? (
                <div className="recipe-container">
                    <h2>Edit Recipe</h2>
                    <form className="recipe-form" onSubmit={handleSubmit}>
                        <label className="recipe-name-label">Recipe Name:</label>
                        <input className="recipe-name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label className="recipe-ingredients-label">Recipe Ingredients</label>
                        <textarea className="recipe-ingredients-input" value={ingredients.join(', ')} onChange={(e) => setIngredients(e.target.value)} />

                        <label className="recipe-steps-label">Recipe Steps</label>
                        <textarea className="recipe-steps-input" value={steps} onChange={(e) => setSteps(e.target.value)} />

                        {!isPending && <button>Save</button>}
                        {isPending && <button disabled>Saving Recipe...</button>}
                    </form>
                    <button className="return-home" onClick={handleHome}>Return Home</button>

                </div>
            ) : (
                <div className="view-recipe-container">
                    <div className="view-recipe">
                        <h1>{recipe.name}</h1>
                        <h2>Ingredients:</h2>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h2>Steps:</h2>
                        <p>{recipe.steps}</p>
                        <div className="button-container">
                            <button className="recipe-edit" onClick={handleEdit}>Edit</button>
                            <button className="recipe-delete" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                    <button className="return-home" onClick={handleHome}>Return Home</button>
                </div>
            )}
        </div>
    );
};

export default Details;


