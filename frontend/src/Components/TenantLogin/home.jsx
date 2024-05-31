import React from 'react';
import './css/Profile.css'
import navprofile from '../../Images/nav-profile.svg';
import View from './View'

const logout = ()=>{
    localStorage.clear();
    window.location.replace("/")
}

const Profile = () => {
    return (
        <div className="content">
        <div  className='navbar'>
       <h1 className="navlogo">Rentify</h1>
       <h3 className="disappear">{localStorage.getItem('name')}</h3>
       <h2 style={{margin: 'none' , border: 'none' , float:'right' , cursor:'pointer'}} onClick={logout}>Logout</h2>
      <img src={navprofile} alt="" className="navprofile"/>
       </div>
        <View />
       </div>

    );
};

export default Profile;
