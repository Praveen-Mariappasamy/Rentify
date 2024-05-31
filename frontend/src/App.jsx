import React from 'react'
import { Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



function App() {
  return (
    <div className='container'>
      <h1 className="intr">RENTIFY WELCOMES YOU...!</h1>
      <Link to={'/owner'} style={{textDecoration:"none"}}>
      <div className='owner'>
        <FontAwesomeIcon icon={faUser} />
        <h3>Owner</h3>
      </div>
      </Link>
      <Link to={'/tenant'} style={{textDecoration:"none"}}>
      <div className='tenant'>
        <FontAwesomeIcon icon={faUser} />
        <h3>Tenant</h3>
      </div>
      </Link>
    </div>
  );
}

export default App;
