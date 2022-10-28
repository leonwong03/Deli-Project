import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

function VapeList({vape, setVapes}) {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const [price, setPrice] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

let vapes = vape.map((i)=> <div className = "container"> <h1 className = "sweet"> Name:{i.name} Price: ${i.price} <img className = "image" src = {i.image_url}></img> </h1></div>)

function handleSubmit(e) {
    e.preventDefault();
    fetch("/vapes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, image_url, description }),
        }).then((r) => {
        if (r.ok) {
            r.json().then((e) => setVapes(e))
        }
        else {
            r.json().then((err) => setErrors(err.errors));
        }
    });
}

return(
    <div> {vapes}
    <div className = "newVape">
        <form onSubmit={(e)=> handleSubmit(e)}>
            <h1 className = "link6">Add A New Vape</h1>
            <label htmlFor="name">Name</label>

            <input
                type="text"
                id="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="price">Price</label>
            <input
                type="text"
                id="price"
                autoComplete="off"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="image_url">Image Url</label>
            <input
                type="text"
                id="image_url"
                autoComplete="off"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <button type="submit">👟</button>

            <div>
                {errors.map((err) => (
                <span className = "link3" key={err}>     {err}!</span>
                ))}
            </div>

        </form>
    </div>
    </div>
)}

export default VapeList