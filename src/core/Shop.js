import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import { getCategories, getProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./FixedPrices";
import Card from "./Card";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters:{ category : [], price: [] }
    })



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

    const handleFilters = (filters, filteredBy) => {
        //console.log("SHOP", filters, filteredBy);
        const newFilters = {...myFilters};
        newFilters.filters[filteredBy] = filters;
        setMyFilters(newFilters);
    }

    return (
        <Layout title= "Home Page"
                description="Get dripped CAWMly"
                className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")} />
                    </ul>
                    <h4>Prices</h4>
                    <div>
                        <Radiobox prices={prices} handleFilters={filters => handleFilters(filters, "price")} />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">SHOWROOM</h2>
                    <div className="col-6 mb-3">
                        {JSON.stringify(myFilters)}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Shop;
