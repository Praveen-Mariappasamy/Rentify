import React, { useEffect } from 'react';
import './css/Profile.css'
import navprofile from '../../Images/nav-profile.svg';
import addicon from '../../Images/add-icon.png'
import { Link } from 'react-router-dom';
import View from './View'
const Profile = () => {
    useEffect(() => {
        if(localStorage.getItem('email')===null){
            alert("Unauthorized. Please log in as an owner first.");
            window.location.replace("/owner")
        }
        const email=localStorage.getItem('email')
        const fetchData = async () => {
            try {
                const response = await fetch('https://rentify-eosin-theta.vercel.app/protected', {
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({email}),
                });
                const data = await response.json();
                if(!data.success){
                    alert("Unauthorized. Please log in as an owner first.");
                    window.location.replace("/owner");
                }
                else{
                    localStorage.setItem('name',data.name);
                    localStorage.setItem('phone',data.phone);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData(); 
    }, []);

    const logout = ()=>{
        localStorage.clear();
        window.location.replace("/")
    }

    return (
        <div className="content">
        <div  className='navbar'>
       <h1 className="navlogo">Rentify</h1>
       <h1 className="disappear">{localStorage.getItem('name')}</h1>
       <h2 style={{margin: 'none' , border: 'none' , float:'right' , cursor:'pointer'}} onClick={logout}>Logout</h2>
       <img src={navprofile} alt="" className="navprofile"/>
       

       </div>
       <Link to={'/addproperty'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={addicon}  alt="" />
                <p>Add Property</p>
            </div>
        </Link>
        <View />
        
       </div>

    );
};

export default Profile;
