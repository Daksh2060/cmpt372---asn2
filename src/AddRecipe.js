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

    const handleSubmit = (e)=> {
        e.preventDefault();

        const recipe = { name, ingredients, steps};

        setIsPending(true);

        fetch('http://localhost:3000/recipes', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe)
        }).then(()=> {
            console.log("New recipe added");
            setIsPending(false);
            navigate('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Recipe</h2>
            <form className="recipe-form" onSubmit={ handleSubmit }>
                
                <label className="recipe-name-label">Recipe Name:</label>
                <input className="recipe-name-input" type = "text" required value = { name } onChange={(e) => setName(e.target.value)}/>

                <label className="recipe-ingredients-label">Recipe Ingredients</label>
                <textarea className="recipe-ingredients-input" type = "text" required value = { ingredients } onChange={(e) => setIngredients(e.target.value)}/>

                <label className="recipe-steps-label">Recipe Steps</label>
                <textarea className="recipe-steps-input" type = "text" required value = { steps } onChange={(e) => setSteps(e.target.value)}/>

                { !isPending && <button className="recipe-delete">Save</button> }
                { isPending && <button className="recipe-save" disabled>Saving Recipe...</button> }
            </form>
            <button className="return-home" onClick={handleHome}>Return Home</button>
        </div>
    );
}
 
export default AddRecipe;