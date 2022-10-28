import React, { useState } from "react";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify({ username, password }),
    }).then((r) => {
        if (r.ok) {
            r.json().then((user) => setUser(user));
        }
        else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }

    return (
        <div className = "container" >
            <form onSubmit= {handleSubmit} >
            <h1> Login </h1>
            <label className = "link5" htmlFor= "username" >Username</label>
            <input className = "link5"
                type= "text"
                id= "username"
                autoComplete= "off"
                value= { username }
                onChange= { (e) => setUsername(e.target.value) }
            />
        <label className = "link5" htmlFor= "password" >Password</label>
        <input className = "link5"
            type= "password"
            id= "password"
            autoComplete= "current-password"
            value= {password}
            onChange= { (e) => setPassword(e.target.value) }
        />
            <button type= "submit" >Login</button>
                </form>
                    { errors.map((err) => (
                    <h1 key={err}>{err}</h1>
                    ))
                    }
        </div>
    );
}

export default Login;