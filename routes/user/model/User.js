const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: Number,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model("user",userSchema)