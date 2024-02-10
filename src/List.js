import { Link } from "react-router-dom";

const StockList = (props) => {

    const stocks = props.stocks

    return (
        <div className="stock-list">
            <h2>{props.title}</h2>
            {stocks.map((stock) => (
                <div className="stock-preview" key = {stock.id}>
                    <Link to = {`/stocks/${stock.id}`}>
                        <h2>{stock.ticker}</h2>
                    </Link>
                </div> 
            ))}
        </div>
    );
}
 
export default StockList;