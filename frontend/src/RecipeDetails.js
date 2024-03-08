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
    const [lastModified, setLastModified] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    //Used to set date from ISO to standard
    const formatDate = (isoDate) => {

        const date = new Date(isoDate);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    //Retrieve the data about the recipe based on id
    useEffect(() => {

        fetch(`http://localhost:8080/recipes/${id}`).then(response => {

                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                return response.json();

            }).then(data => {

                setRecipe(data);
                setName(data.name);
                setIngredients(data.ingredients);
                setSteps(data.steps);
                setLastModified(data.last_modified);
            }).catch(error => console.error('Error fetching recipe:', error));
    }, [id]);

    // Handle deleting a recipe from the details page
    const handleDelete = () => {

        fetch(`http://localhost:8080/recipes/${id}`, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        }).catch(error => console.error('Error deleting recipe:', error));
    };

    //Set the page to the editing route, to change recipe details
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleHome = () => {
        navigate('/');
    }

    //Handle submission of an updated recipe
    const handleSubmit = (e) => {

        e.preventDefault();
        const updatedRecipe = { name, ingredients, steps };
        setIsPending(true);
        fetch(`http://localhost:8080/recipes/${id}`, {

            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedRecipe)
        }).then(() => {

                console.log("Recipe updated");
                setIsPending(false);
                setIsEditing(false);
                
                setRecipe(prevRecipe => ({
                    ...prevRecipe,
                    name,
                    ingredients,
                    steps
                }));
               
                setLastModified(new Date().toISOString());
            }).catch(error => console.error('Error updating recipe:', error));
    };

    //Loading screen for loading recipe details
    if (!recipe) return <div>Loading...</div>;

    //Updating for for the recipe
    return (
        <div className="details">
            {isEditing ? (
                <div className="recipe-container">
                    <h2>Edit Recipe</h2>
                    <form className="recipe-form" onSubmit={handleSubmit}>
                        <label className="recipe-name-label">Recipe Name:</label>
                        <input className="recipe-name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label className="recipe-ingredients-label">Recipe Ingredients:</label>
                        <p className="recipe-ingredients-warning">(Please enter as a comma separated list. ex: "salt, pepper, cheese, etc...")</p>
                        <textarea 
                            className="recipe-ingredients-input" 
                            value={ingredients.join(', ')} 
                            onChange={(e) => setIngredients(e.target.value.split(', '))}
                        />
                
                        <label className="recipe-steps-label">Recipe Steps:</label>
                        <textarea className="recipe-steps-input" value={steps} onChange={(e) => setSteps(e.target.value)} />

                        {!isPending && <button>Save</button>}
                        {isPending && <button disabled>Saving Recipe...</button>}
                    </form>
                    <button className="return-home" onClick={handleHome}>Return Home</button>

                </div>
            ) : (
                //Display the recipe details
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
                        <p>Last Modified: {lastModified && formatDate(lastModified)}</p>
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
