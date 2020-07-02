import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct} from "./apiAdmin";


const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: "",
        formData: ""
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({...values, [name]: value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
        createProduct(user._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo:"",
                        price: "",
                        quantity: "",
                        loading: false,
                        createdProduct: data.name
                    });
                }
            })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" /></label>
            </div>

            <div className="form-group">
                <label className="">Name</label>
                <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="">Description</label>
                <textarea onChange={handleChange("description")} type="text" className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="">Price</label>
                <input onChange={handleChange("price")} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="">Category</label>
                <select onChange={handleChange("category")} className="form-control">
                    <option value="5ef7a1475e01d00e62b2133d">Outerwear</option>
                    <option value="5ef7a1475e01d00e62b2133d">Shirt</option>
                </select>
            </div>

            <div className="form-group">
                <label className="">Quantity</label>
                <input onChange={handleChange("quantity")} type="number" className="form-control" value={quantity} />
            </div>

            <div className="form-group">
                <label className="">Shipping</label>
                <select onChange={handleChange("shipping")} className="form-control">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    )

    return (
        <Layout title="Add a New Product"
                description={`Hey ${user.name}, let's make a new product`}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {newPostForm()}
                </div>
            </div>

        </Layout>
    )
}

export default AddProduct;
