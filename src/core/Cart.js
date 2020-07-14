import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./CartHelper";
import Card from "./Card";

const Cart = () => {
    const [ items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart())
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        )
    }

    const emptyCartMessage = () => (
        <h2>Nada . Zilch . Nothing Here Brokey... Go <Link to="/shop">Shop</Link> </h2>
    )

    return (
        <Layout title="Shopping Cart" description="Manage Your Cart" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : emptyCartMessage()}
                </div>

                <div className="col-6">
                    <p> Checkout </p>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;