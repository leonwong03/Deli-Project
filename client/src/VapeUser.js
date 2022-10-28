import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import './App.css';

function VapeUser({ user, vape, review, handleDeleteReviews,setcurrentUser, setUser, setReview}) {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);
    const [vape_review, setVapeReview] = useState("");
    const [name, setVapeName] = useState("");

    function handleDeleteReview(e)
    {
      // console.log(e)
        fetch(`/user_item/${e.id}`,
        {method:"DELETE"
        })

        handleDeleteReviews(e)
    }



    function handleUserChange(e) {
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(username)
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                username
            }),
            }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
                alert(`Username Changed to ${username}!`)
            }
            else {
                r.json().then((err) => setErrors(err.error));
                alert("Username blank or already in use!!!")
            }
            });
        }

        function deleteUser(e)
        {
            console.log(e)
            fetch(`/users/${e.id}`,
                {
                    method: "DELETE"
                })
            setcurrentUser(null)
        }
    
        function handleUserAddReview(e) {
            e.preventDefault();
            // console.log(e.target[0].value)
            // console.log(e.target[1].value)
            // console.log(user.id)
            fetch(`/user_items`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "vape_id":e.target[0].value ,
                "user_id": user.id,
                "vape_review":e.target[1].value
            }),
            }).then((r) => {
            if (r.ok) {
                r.json().then((e) => setReview(e))
                alert(`Review Added!`)
            }
            else {
                r.json().then((err) => setErrors(err.error));
                alert("Please add a review and resubmit!!!")
            }
            });
        }

    let cool3 = review.filter((item)=> item.user_id === user.id).map((u)=> <ul className = "sweet1" key ={u.vape_review}> {u.vape.name}: {u.vape_review} <button className = "div1" onClick = {()=> handleDeleteReview(u)}>👟👟Delete Review👟👟</button></ul>)

    let vapemapz = vape.map((item)=> <option value={item.id}>{item.name}</option> )
    
    return (
        <>
    <ol className = "div5"> {user.username}'s Reviews
        {cool3}</ol>

        <button className = "div1" onClick = {()=>deleteUser(user)} >👟👟 Delete User 👟👟</button>
        <form onSubmit={handleUserChange}>
        <h1>Change Your Username!</h1>
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        <button className = "div1"  type="submit">👟👟 Submit New Username 👟👟</button>
        </form>
        <form onSubmit={(e)=> handleUserAddReview(e)}>
        <h1>Add a Vape And Review to Your List!</h1>
            <label htmlFor="name">Vape</label>
            <select name="selectList" id="selectList"
                autoComplete="off"
                value={name}
                onChange={(e) => setVapeName(e.target.value)}>
                    {vapemapz}
            </select>
            <label htmlFor="vape_review">Vape Review</label>
            <input
                type="text"
                id="username"
                autoComplete="off"
                value={vape_review}
                onChange={(e) => setVapeReview(e.target.value)}
            />
            <button className = "div1" type="submit">Add Review</button>
        </form>
</>

)
}

export default VapeUser