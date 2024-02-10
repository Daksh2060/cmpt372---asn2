import RecipeList from "./RecipeList";
import useFetch from "./useFetch";

const Home = () => {


    const { data: stocks, isLoading, error } = useFetch('http://localhost:3000/stocks')

    return (
        <div className="home">
            <h2>Home</h2>
            { error && <div>{error}</div>}
            { isLoading && <div>Loading...</div> }
            { stocks && <RecipeList stocks = {stocks} title = "Expesnive Sotcks"/> }
        </div>
    );
}
 
export default Home