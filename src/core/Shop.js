import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import { getCategories, getProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Card from "./Card";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);



    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        init();
    }, []);


    return (
        <Layout title= "Home Page"
                description="Get dripped CAWMly"
                className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>categories</h4>
                    <ul>
                        <Checkbox categories={categories} />
                    </ul>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">SHOWROOM</h2>
                    <div className="col-6 mb-3">
                        right
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Shop;
