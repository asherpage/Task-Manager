const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, `Must provide a name`],
        trim:true,
        maxLength:[20,"the name can exceed 20 characters"]
    },
    age:{
        type:Number,
        default:5
    }
})

modules.exports = mongoose.model('Person', personSchema)
mongoose.model.find({complete:true})