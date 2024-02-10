import RecipeList from "./RecipeList";
import useFetch from "./useFetch";

const Home = () => {


    const { data: recipes, isLoading, error } = useFetch('http://localhost:3000/recipes')

    return (
        <div className="home">
            <h2>Home</h2>
            { error && <div>{error}</div>}
            { isLoading && <div>Loading...</div> }
            { recipes && <RecipeList recipes = {recipes}/> }
        </div>
    );
}
 
export default Home