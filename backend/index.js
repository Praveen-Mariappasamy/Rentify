const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Tenants = require('./schema');
const multer = require('./multerConfig');
const path = require("path");
const Owners = require('./schema2');
const Property = require('./schema3');
const jwt = require('jsonwebtoken');
const { error } = require('console');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["https://rentify-kjn9.vercel.app/"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use('/images',express.static('/tmp'))

mongoose.connect(process.env.DB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/',(req,res) => {
    console.log("Connected");
})

app.post("/upload",multer.single('product'),(req,res)=>{
    try{
    res.json({
        success:1,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
}
catch{
    res.send({success:false})
}
})

app.post('/addproduct',async(req,res)=>{
    try{
    const property = new Property({
        location:req.body.location,
        image:req.body.image,
        number:req.body.number,
        cost:req.body.cost,
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
        fav: req.body.fav,
        rating: 0
    });
    await property.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
}
catch{
    res.send({success:false})
}
})

app.post('/newprops',async(req,res)=>{
    try{
    const {page , fil , email}=req.body;
    const pageSize = 6;
    const sorter = fil;
    const skipCount = (page-1) * pageSize;
    const props = await Property.find({email: email}).sort({ rating: sorter }).skip(skipCount).limit(pageSize).exec();
    res.status(200).send(props);
    }
    catch{
        res.status(400).send({success:false})
    }
})

app.post('/allprops',async(req,res)=>{
    try{
    const {page , fil}=req.body;
    const pageSize = 6;
    const sorter = fil;
    const skipCount = (page-1) * pageSize;
    const props = await Property.find().sort({ rating: sorter }).skip(skipCount).limit(pageSize).exec();
    res.status(200).send(props);
    }
    catch{
        res.status(400).send({success:false})
    }
})

app.post('/update',async(req,res)=>{
    try{
    const {id,rating} = req.body;
    const filter = { _id: id};
    const update = {
            rating: rating+1
    };
    await Property.findOneAndUpdate(filter, update);
    res.status(200).send({success:true})
}
catch{
    res.status(400).send({success:false})
}
})

app.post('/delete',async(req,res)=>{
    try{
    const {id,rating} = req.body;
    const filter = { _id: id};
    await Property.findOneAndDelete(filter);
    res.status(200).send({success:true})
    }
    catch{
        res.status(400).send({success:false})
    }
})

app.post('/login',async(req,res)=>{
    try{
    let user;
    if(req.body.type==="tenant"){
        user = await Tenants.findOne({email:req.body.email});
        if(user){
            const passCompare = req.body.password===user.password?true:false;
            if(passCompare){
                const email = user.email;
                const name = user.fname+user.lname;
                res.json({success:true,email:email,name:name});
            }
            else{
                res.json({success:false,error:"Wrong Password"});
            }
        }
        else{
            res.json({success:false,error:"Wrong Email Id"});
        }
    }

    else{
    user = await Owners.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password===user.password?true:false;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const options = { expiresIn: '2h' };
            const token = jwt.sign(data, process.env.sk , options);
            const email = user.email;
            const name = user.fname+user.lname;
            res.json({success:true,token:token,email:email,name:name});
        }
        else{
            res.json({success:false,error:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Id"});
    }
}
    }
    catch{
        res.json({success:false,error:"Something Went Wrong"});
    }
})

app.post('/signup',async(req,res)=>{
    try{
    let user
    if(req.body.type==="tenant"){
        user = new Tenants({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            number: req.body.number
        })}
    else{
        user = new Owners({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            number: req.body.number
        })
    }
    await user.save();
    return res.json({success:true});
}
catch{
    res.json({success:false});
}

})

app.post('/protected',async (req, res) => {
    try{
    const {email}=req.body;
    let user;
    if(email) user = await Owners.findOne({email:req.body.email});
    if(user){
            const data={
                user:{
                    id:user.id
                }
            }
            const options = { expiresIn: '2h' };
            const name=user.fname+user.lname;
            const phone = user.number;
            const token = jwt.sign(data, process.env.sk , options);
            res.json({success:true,token:token,name:name,phone:phone});
        }
    else{
        res.json({success:false,error:"Invalid session"});
    }
}
catch{
    res.json({success:false,error:"Invalid session"});
}
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
