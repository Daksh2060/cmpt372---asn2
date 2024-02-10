import { useState } from "react";
import { useNavigate } from "react-router";

const AddRecipe = () => {

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();

        const stock = { name, ingredients, steps};

        setIsPending(true);

        fetch('http://localhost:3000/stocks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stock)
        }).then(()=> {
            console.log("New stock added");
            setIsPending(false);
            navigate('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Recipe</h2>
            <form onSubmit={ handleSubmit }>
                <label>Recipe Name</label>
                <input type = "text" required value = { name } onChange={(e) => setName(e.target.value)}/>

                <label>Recipe Ingredients</label>
                <textarea type = "text" required value = { ingredients } onChange={(e) => setIngredients(e.target.value)}/>

                <label>Recipe Steps</label>
                <textarea type = "text" required value = { steps } onChange={(e) => setSteps(e.target.value)}/>

                { !isPending && <button>Save</button> }
                { isPending && <button disabled>Saving Recipe...</button> }
            </form>
        </div>
    );
}
 
export default AddRecipe;