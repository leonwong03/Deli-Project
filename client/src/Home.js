import VapeUser from "./VapeUser"

function Home({ user, vape, user_item, handleDeleteUserItem, setcurrentUser, setUser, setUserItem }) {


    if (user) {
        return <VapeUser setUserItem = {setUserItem} user = {user} vape = {vape} user_item = {user_item} handleDeleteUserItem = {handleDeleteUserItem} setcurrentUser = {setcurrentUser} setUser = {setUser} ></VapeUser> 
    } 
    else {
        return <h1 className = "intro">Welcome to 69th St Convenience Store! 4002 69th St Woodside, NY 11377 </h1>;
        
    }
}

export default Home;