// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import VapeList from "./VapeList";
import Vape from "./Vape";
import './App.css';
//import VapeUser from "./VapeUser";

function App() {
    const [vapes, setVapes] = useState([])
    const [user_items, setUserItems] = useState([])
    const [currentUser, setcurrentUser] = useState({})
    //const [errors1, setErrors] = useState([])

    useEffect(() => {
      // auto-login
      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => setcurrentUser(user));
        }
      });
    }, []);

    useEffect(()=>{
      fetch('/vapes')
      .then(r=> r.json())
      .then(data => setVapes(data))
      }
      ,[])

    useEffect(()=>{
      fetch('/user_items')
      .then(r=> r.json())
      .then(data => set_UserItems(data))
      }
      ,[])

      function setUser(user)
        {
          setcurrentUser(user)
        }


      function set_UserItems(e)
        {
        setUserItems([...user_items, e])
        }

      function setVapes1(e)
        {

          setVapes([...vapes, e])
        }

      function handleDeleteUserItems(e)
        {
          set_UserItems(user_items.filter((item)=> item.id!== e.id))
        }

      function set_currentUser(e)
        {
          setcurrentUser(null)
        }

      function setUser1(e)
        {
          setcurrentUser(e)
        }

      console.log(currentUser)
      // console.log(reviews)
      // console.log(vapes)
      // console.log(currentUser)

      return (
        <BrowserRouter>
          <div className="App">
          <NavBar user={currentUser} setUser={setUser} />
          
          <main>
            <Switch>
              
              <Route path={"/vape/:vapeId"}>
                <Vape currentUser = {currentUser} vapes = {vapes} />
              </Route>

              <Route exact path="/vape">
                <VapeList vape = {vapes} setVapes = {setVapes1}/>
              </Route>

              <Route path="/signup">
                <SignUp setUser={setUser} />
              </Route>

              <Route path="/login">
                <LoginForm setUser={setUser} />
              </Route>

              <Route path="/">
                  <Home />
              </Route>
            </Switch>
          </main>
        
          </div>
        </BrowserRouter>
      );
    }

export default App;