import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product, showViewProductButton = true }) => {
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

    return (
        // <div className={"col-4 mb-3"}>
            <div className="card">
                <div className="card-header">
                    {product.name}
                </div>
                <div className="card-body">
                    <ShowImage item={product} url="products" />
                    <p>{product.description.substring(0, 100)}</p>
                    <p>${product.price}</p>
                    {showViewButton(showViewProductButton)}
                    <button className="btn btn-outline-warning mt-2 mb-2">
                        Add to Cart
                    </button>
                </div>
            </div>
        // </div>
    )
}

export default Card;
