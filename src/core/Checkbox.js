import React, { useState, useEffect } from "react";

const Checkbox = ({categories}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        // returns first index or -1 if not checked
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked]; // everything in state
        // toggle
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        } else{
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId)
    }

    return categories.map((c,i) => (
        <li className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                className="form-check-input"
            />

            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}
export default Checkbox;
