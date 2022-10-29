import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function VapeReview({review, userId, vapeId, updateVapeReview }) {
    console.log('VapeReview', review, userId, vapeId);

    const [editable, setEditable] = useState(false);

    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState(review.comment);
    const [rating, setRating] = useState(review.rating);

    function handleSubmit(e) {
        console.log({ userId, vapeId, comment, rating });
        e.preventDefault();
        fetch(`/vape_reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, vapeId, comment, rating }),
            }).then((r) => {
            if (r.ok) {
                r.json().then((e) => {
                    setComment(e.comment);
                    setRating(e.rating);
                    setEditable(false);
                    updateVapeReview()
                })
            }
            else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }
    
    function deleteReview(e, review_id) {
        console.log(review_id);
        e.preventDefault();
        fetch(`/vape_reviews/${review_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
            }).then((r) => {
            if (r.ok) {
                updateVapeReview()
            }
            else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

return ( 
    <div>
        Reviews:
        <div className = "newVapeReview">
            { editable === true ? (
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <h1 className = "link6">Edit Review</h1>
                    <label htmlFor="comment">Comment</label>
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
                    <div>
                        {errors.map((err) => (
                        <span className = "link3" key={err}>     {err}!</span>
                        ))}
                    </div>
                </form>
            )
            : ( <div key={review.id} className = "container"> 
                    <h1 className = ""> 
                        comment:{review.comment} 
                        rating: ${review.rating} 
                        {review.user_id === userId ? <button onClick={(e) => setEditable(!editable)}>Edit</button>: ''}
                        {review.user_id === userId ? <button onClick={(e) => deleteReview(e, review.id)}>Delete</button> : ''}
                    </h1>
                </div>
            )}
        </div>
    </div>
)}

export default VapeReview