const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
    password:{
        type: String,
        required: true,
    },
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    number:{
        type: String,
    }
})

const Owners = mongoose.model("owners",User_schema);

module.exports = Owners;