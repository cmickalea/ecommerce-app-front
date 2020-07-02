import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct} from "./apiAdmin";


const AddProduct = () => {

    const { user, token } = isAuthenticated();

    return (
        <Layout title="Add a New Product"
                description={`Hey ${user.name}, let's make a new product`}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                </div>
            </div>
            {goBack()}
        </Layout>
    )
}

export default AddProduct;
