import { Link } from "react-router-dom";

//Used as a placeholder to redirect invalid routes
const NotFound = () => {
    return ( 
        <div className="notfound">
            <h2>Sorry</h2>
            <p>Page Not Found</p>
            <Link to ="/">Back to Home</Link>
        </div>
     );
}
 
export default NotFound;