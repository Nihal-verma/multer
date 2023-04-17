const moongose = require("mongoose")
const multerSchema = new moongose.Schema({
    file:{
        type:String,
        required:true
    }
},{
timestamps:true
})
const multermodel = new moongose.model("multer",multerSchema)
module.exports =multermodel