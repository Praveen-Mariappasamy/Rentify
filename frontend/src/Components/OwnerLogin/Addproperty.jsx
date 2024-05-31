import React , {useState} from 'react'
import upload from '../../Images/upload_area.svg'
import './css/Addproperty.css'
const Addproperty = () => {
    const [image,setImage] = useState(false);
  const [data, setData] = useState({
    location: '',
    number: '',
    fav: false,
    image: '',
    rating: 0,
    cost: '',
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    phone: localStorage.getItem('phone')
  })
  let name, value;
  const change = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === 'fav') {
      setData({ ...data, fav: !data.fav });
    }
    else {
      setData({ ...data, [name]: value });
    }
  }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const addproperty = async()=>{
    let resData;
    let prop = data;
    let formdata = new FormData();
    formdata.append('product',image);

    await fetch('https://rentify-eosin-theta.vercel.app/upload',{
        method:'POST',
        headers:{
            Accept:'application/json',
        },
        body:formdata,
    }).then((res)=>res.json()).then((data)=>{resData=data})

    if(resData.success){
        prop.image=resData.image_url;
        await fetch('https://rentify-eosin-theta.vercel.app/addproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(prop),
        }).then((res)=>res.json()).then((data)=>{
            data.success?alert("Property Added"):alert("Failed");
            window.location.reload();
        })
    }
}


  return (
    <div className='addprod'>
      <div className="addprod-item-field">
        <p>Location</p>
        <input type="text" name="location" value={data.location} placeholder='Type Here' onChange={change} />
      </div>
        <div className="addprod-item-field">
          <p>Number of bedrooms</p>
          <input type="textbox" value={data.number} style={{ width: '590px', height: '40px' }} onChange={change} name="number" placeholder='Type Here' />
          </div>
        <div className="addprod-item-field">
          <p>Cost</p>
          <input type="textbox" value={data.cost} style={{ width: '590px', height: '40px' }} onChange={change} name="cost" placeholder='Type Here' />
        </div>
        <br/>
        <div className="addprod-item-field">
          <p>Is hospitals and schools nearby?</p>
          <input type="checkbox" value={data.fav} style={{ width: '50px', height: '35px' }} onChange={change} name="fav" />
        </div>
      <div className="addprod-item-field">
        <label htmlFor="fileInput">
          <img src={image ? URL.createObjectURL(image) : upload} onChange={change} className="addprod-thumbnail" alt="" />
        </label>
        <input type="file"
          id="fileInput"
          onChange={imageHandler}
          style={{ display: 'none' }}
          name="image"
        />
      </div>
      <button className="addprod-button" onClick={()=>{addproperty()}}>ADD</button>
    </div>
  )
}

export default Addproperty
