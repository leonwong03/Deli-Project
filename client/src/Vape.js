import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Vape({currentUser, vapes }) {
    let { vapeId } = useParams();
    console.log(vapeId);
    const vape_id = parseInt(vapeId);
    const user_id = currentUser.id;

    const [vapeReviews, setVapeReviews] = useState([]);
    const [errors, setErrors] = useState([]);

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        console.log(vapeReviews);
    }, [vapeReviews])

function addVapeReview(e)
        {
        setVapeReviews([...vapeReviews, e])
        }

useEffect(()=>{
    fetch(`/vapes/${vape_id}/vape_reviews`)
    .then(r=> r.json())
    .then(data => setVapeReviews(data))
    }
    ,[])

function handleSubmit(e) {
    console.log({ user_id, vape_id, comment, rating });
    e.preventDefault();
    fetch(`/vape_reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, vape_id, comment, rating }),
        }).then((r) => {
        if (r.ok) {
            r.json().then((e) => addVapeReview(e))
        }
        else {
            r.json().then((err) => setErrors(err.errors));
        }
    });
}

return(
    <div>
            <div className = "newVapeReview">
                <form onSubmit={(e)=> handleSubmit(e)}>
            <h1 className = "link6">Add A Review</h1>
            <input
                type="text"
                id="comment"
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <label htmlFor="rating">Rating</label>
            <input
                type="text"
                id="rating"
                autoComplete="off"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />

            <button type="submit">Submit</button>

            <label htmlFor="comment">Comment</label>
            <div>
                {errors.map((err) => (
                <span className = "link3" key={err}>     {err}!</span>
                ))}
            </div>


        <div className = "container">
            {vapeId && (vapes[vapeId] !== undefined ?
                <h1 className = "sweet"> Name:{vapes[vapeId].name} Price: ${vapes[vapeId].price} <img className = "image" src = {vapes[vapeId].image_url}></img></h1>
            : 'Not Found')}
        </div>
        {vapeReviews.map((i)=> {
            return <div className = "container"> <h1 className = ""> comment:{i.comment} rating: ${i.rating} {i.user_id === user_id ? 'edit' : ''} {i.user_id === user_id ? 'delete' : ''}</h1></div>
        })}
        </form>
    </div>
    </div>
)}

export default Vape