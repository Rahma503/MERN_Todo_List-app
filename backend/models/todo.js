const mongoose = require("mongoose")


const TodoSchema = new mongoose.Schema({
    task:{
        type:String
        ,required:true
    }
},
{timestamps:true})

const TodoModel = mongoose.model("todos",TodoSchema)

module.exports=TodoModel