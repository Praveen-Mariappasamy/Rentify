import React, { useState } from 'react';
import './Item.css';
import star from '../../Images/star_icon.png'
import nostar from '../../Images/star_dull_icon.png'
import cross_icon from '../../Images/cross_icon.png'
const Item = (props) => {
  const sender = localStorage.getItem('email');
  const receiver = props.email;
  console.log(props.fav)
  const [like,setLike] = useState(props.rating);
  const [liked,setLiked] = useState(false);
  const updater = async()=>{
    const res=await fetch('http://localhost:5000/update',{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: props.id,rating: like})
    })
    
    if(res.ok) {
      setLike(like+1);
      setLiked(!liked)
    }

    else{
      alert("Some error occured")
    }
  }

  const removeFun=async()=>{
    const res=await fetch('http://localhost:5000/delete',{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: props.id})
    })
    
    if(res.ok) {
      props.onDelete(props.id);
    }

    else{
      alert("Some error occured")
    }
  }
  const handler = async () => {
    window.location.href = `mailto:${receiver}?subject=Type here&body=type here`;
    alert("Mail Initiated , header for recepient")
  };
  return (

    <div className="item">
      <div className='intro'>
      <img src={props.image} className="property" alt="Item" />
      {props.email===sender && <img className="cross" src={cross_icon} style={{ width: '20px', height: 'auto' }} onClick={removeFun} alt="" />}
      </div>
      <p>{props.location}</p>
      <div className="item-prices">
        <div>Rs {props.cost}</div>
        <div>BHK: {props.number}</div>
        <div className="star">
          {!liked && <img src={nostar} alt="Item" style={{ width: '20px', height: 'auto' }} onClick={updater}/> }
          {liked && <img src={star} alt="Item" style={{ width: '20px', height: 'auto' }} />}
          {like}
        </div>
        <div>Facilities nearby:
          {props.fav && <h3>Yes</h3>}
          {!props.fav && <h3>No</h3>}
          </div>
        <div>
        { sender!==receiver && <button onClick={handler}>Interested</button>}
        </div>
      </div>
    </div>
  );
};

export default Item;
