const mongoose = require("mongoose")

const problemSchema = ({
    user:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    appointment:{
        type:Date,
        require:true
    },
    problems:{
        type:Array,
    }
})

module.exports = mongoose.model("problem",problemSchema)