import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tenant from './Components/TenantLogin/Tenant'
import Owner from './Components/OwnerLogin/Owner'
import Profile from './Components/OwnerLogin/Profile'
import Home from './Components/TenantLogin/home'
import Addproperty from './Components/OwnerLogin/Addproperty'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/tenant" element={<Tenant />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addproperty" element={<Addproperty />} />
          <Route path="/home" element={<Home />} />

          
        </Routes>
  </BrowserRouter>
);

reportWebVitals();
