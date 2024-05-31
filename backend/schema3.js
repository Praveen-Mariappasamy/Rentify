const mongoose = require("mongoose");

const Schema3 = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    number:{
        type: String,
    },
    phone:{
        type: String,
    },
    location:{
        type: String,
    },
    rating:{
        type: Number,
    },
    fav:{
        type: Boolean,
    },
    image:{
        type: String,
        required: true,
    },
    cost:{
        type: String,
        required: true,
    }
})

const Property = mongoose.model("propertys",Schema3);

module.exports = Property;