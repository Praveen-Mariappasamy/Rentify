import React, { useState , useEffect } from 'react'
import "./css/NewCollections.css"
import Item from '../Item/Item'
import arrow from '../../Images/rightarr.png'
import arr from '../../Images/lleftarr.png'
const View = () => {
  const [post,setPost] = useState([]);
  const [page,setPage] = useState(1);
  const [prev,setPrev] = useState(false);
  const [fil,setFil] = useState(-1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/allprops' , {
          method: 'POST',
          headers:{
           Accept:'application/json',
          'Content-Type':'application/json'
          },
          body: JSON.stringify({page , fil})
        })
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page,fil]);

  const handleClick=async()=>{
    setPage(page => page + 1);
    setPrev(true)
  }

  const handleClick2 = async()=>{
    if(page===2){
      setPrev(false)
    }
    setPage(page => page - 1);
    
  }

  const filter = ()=>{
    if(fil===1) setFil(-1);
    else setFil(1);
  }

  return (
    <div className="newcollections">
      <h1>AVAILABLE PROPERTIES</h1>
      <select onChange={filter}>
      <option>Filter rating in ascending order</option>
        <option>Filter in rating in descending order</option>
      </select>
      <hr />
      {prev && <img src={arr} style={{ width: '40px', height: 'auto' , cursor: 'pointer' , padding: '10px' }} onClick={handleClick2} alt="turn" /> }
      <div className="collections">
          { post.map((item,i)=>{
            return <Item key={i} id={item._id} location={item.location} image={item.image} cost={item.cost} phone={item.phone} number={item.number} email={item.email} rating={item.rating} fav={item.fav}/>
          })}
      </div>
      { !prev && <img src={arrow} style={{ width: '40px', height: 'auto' , cursor: 'pointer' , padding: '10px'}} onClick={handleClick} alt="turn" /> }
    </div>
  )
}

export default View