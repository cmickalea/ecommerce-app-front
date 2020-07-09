import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./FixedPrices";
import Card from "./Card";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters:{ category : [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        //console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error){
                setError(data.error);
            } else {
                setFilteredResults(data);
            }
        })
    };

    useEffect(() => {
        loadFilteredResults(skip, limit, myFilters.filters);
        init();
    }, []);

    const handleFilters = (filters, filteredBy) => {
        //console.log("SHOP", filters, filteredBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filteredBy] = filters;

        if(filteredBy == "price"){
            let priceValues = handlePrice(filters);
            newFilters.filters[filteredBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for(let key in data) {
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;
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
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")} />
                    </ul>
                    <h4>Prices</h4>
                    <div>
                        <Radiobox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")} />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">SHOWROOM</h2>
                    <div className="row">
                        {JSON.stringify(filteredResults)}
                        {/*{filteredResults.map((product, i) => (*/}
                        {/*    <Card key={i} product={product}/>*/}
                        {/*    ))}*/}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
