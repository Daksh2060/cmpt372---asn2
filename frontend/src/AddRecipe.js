import { useState } from "react";
import { useNavigate } from "react-router";

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Split the ingredients string into an array
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
    
        const recipe = { name, ingredients: ingredientsArray, steps };
    
        setIsPending(true);
    
        try {
            const response = await fetch('http://localhost:8080/recipes', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipe)
            });
    
            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }
    
            console.log("New recipe added");
            setIsPending(false);
            navigate('/');
        } catch (error) {
            console.error('Error adding recipe:', error);
            setIsPending(false);
        }
    }
    
    return (
        <div className="recipe-container">
            <h2>Add New Recipe</h2>
            <div className="create">
                <form className="recipe-form" onSubmit={handleSubmit}>

                    <label className="recipe-name-label">Recipe Name:</label>
                    <input className="recipe-name-input" type="text" required value={name} onChange={(e) => setName(e.target.value)} />

                    <label className="recipe-ingredients-label">Recipe Ingredients:</label>
                    <textarea className="recipe-ingredients-input" type="text" required value={ingredients} onChange={(e) => setIngredients(e.target.value)} />

                    <label className="recipe-steps-label">Recipe Steps:</label>
                    <textarea className="recipe-steps-input" type="text" required value={steps} onChange={(e) => setSteps(e.target.value)} />

                    {!isPending && <button>SAVE</button>}
                    {isPending && <button disabled>Saving Recipe...</button>}
                </form>
            </div>
            <button className="return-home" onClick={handleHome}>RETURN HOME</button>
        </div>
    );
}

export default AddRecipe;