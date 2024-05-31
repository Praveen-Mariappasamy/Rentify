import React, { useState } from 'react'
import './css/LoginSignup.css'
const Owner = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    fname:"",
    lname:"",
    password:"",
    email:"",
    number:"",
    type: "owner"
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async () => {
    let resData;
    await fetch('https://rentify-eosin-theta.vercel.app/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>resData=data)
    if (resData.success) {
        localStorage.setItem('auth-token',resData.token);
        localStorage.setItem('email',resData.email);
        window.location.replace("/profile");
    } else {
        alert(resData.error);
    }
  }

  const signup = async () => {
    const isValidNumber = /^\d{10}$/.test(formData.number);
    if(!isValidNumber){
      alert("Invalid Phone Number");
      return;
    }
    const isValidEmail = (formData.email).includes('@');
    if(!isValidEmail){
      alert("Invalid E-mail Address");
      return;
    }
    try {
      const response = await fetch('https://rentify-eosin-theta.vercel.app/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        window.location.replace("/owner");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert("An error occurred during registration. Please try again later.");
    }
  }; 
  

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?
          <>
          <input value={formData.fname} onChange={changeHandler} name="fname" type="text" placeholder="Your First Name" />
          <input value={formData.lname} onChange={changeHandler} name="lname" type="text" placeholder="Your Last Name" />
          <input value={formData.number} onChange={changeHandler} name="number" type="text" placeHolder="Enter mobile number" /></>:<></>}
          <input value={formData.email} onChange={changeHandler} name="email" type="email" placeholder="Your email" />
          <input value={formData.password} onChange={changeHandler} name="password" type="password" placeholder="Password" />
          
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p>:<p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        
      </div>
    </div>
  )
}

export default Owner
