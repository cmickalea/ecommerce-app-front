import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./CartHelper";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
    const [ items, setItems] = useState([]);
    const [ run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart())
    }, [run]);

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
                        setRun={setRun}
                        run={run}
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
                    <h2 className="mb-4"> Checkout</h2>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;
