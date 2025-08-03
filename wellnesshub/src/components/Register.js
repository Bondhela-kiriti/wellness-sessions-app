import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"

const Register = () =>{
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleRegister = async(e)=>{
    e.preventDefault();  
try{
    await API.post("/auth/register", {email, password})
  alert("registeres ! please login")
    navigate("/login")
}
    catch(err){
      alert(err.response.data.error || "register failed")
    }
    
  }

  
  return(
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  )
}


export default Register