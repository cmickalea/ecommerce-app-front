import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem} from "./CartHelper";

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = true }) => {
    const [redirect, setRedirect] = useState(false);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Product
                </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return  showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        )
    }


    return (
        // <div className={"col-4 mb-3"}>
            <div className="card">
                <div className="card-header">
                    {product.name}
                </div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="products" />
                    <p>{product.description.substring(0, 100)}</p>
                    <p>${product.price}</p>
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                </div>
            </div>
        // </div>
    )
}

export default Card;
