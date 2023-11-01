import React, { useState } from "react"
import "./Login.scss";
import newRequest from "../../utils/newRequest.js"
import { useNavigate } from "react-router-dom";

//yarn add cors (resoudre l'erreur "blocked by CORS policy")
function Login() {
const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState(null);
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const res = await newRequest.post("/auth/login", {username,password});
    //res.data est un objet donc il faut le rendre en string
    localStorage.setItem("currentUser",JSON.stringify(res.data));
    //Rediriger vers le HomePage
    navigate("/");

}catch(err){
  setError(err.response.data);
 
}
};

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input name="username" type="text" placeholder="johndoe" onChange={e=>setUsername(e.target.value)}/>

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={e=>setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && error}
      </form>
      
    </div>
  )
}

export default Login