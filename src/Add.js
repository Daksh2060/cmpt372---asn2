import { useState } from "react";
import { useNavigate } from "react-router";

const AddStock = () => {

    const [ticker, setTicker] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();
        let price = "0";
        const stock = { ticker, price};

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
            <h2>Add a New Stock</h2>
            <form onSubmit={ handleSubmit }>
                <label>Stock Ticker</label>
                <input type = "text" required value = { ticker } onChange={(e) => setTicker(e.target.value)}/>
                { !isPending && <button>Save</button> }
                { isPending && <button disabled>Saving Stock...</button> }
            </form>
        </div>
    );
}
 
export default AddStock;