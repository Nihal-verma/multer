// const express = require("express")
// const multer = require("multer")
// const app = express()

// const multermodel = require("./multermodel")
// app.use(express.static("upload"))


// const baseUrl = "http://localhost:8000/upload/"

// const mongoose = require("mongoose")
// mongoose.connect("mongodb://0.0.0.0:27017/multer",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("database connect");
// }).catch((err)=>{
//     console.log("error occured",err);
// })

//  const storage = multer.diskStorage({

//         destination:function(req,file,cb){
//             cb(null,"../upload")               // where we want our file to be
//         },
//         filename:function(req,file,cb){
//             cb(null, Date.now()+ file.originalname)  // giving format "jpg" for us to look the uploaded file in jpg format we can change it as per need
//         }
//     })

//   const upload = multer({storage:storage,
//   fileFilter:function (req,file,cb){
//     if(file.mimetype=="application/pdf"){
//         cb(null,true)
//      }else{
//           cb(null,false)
//          }
//   }
//  })
// app.post("/fileupload",upload.array("file"),async (req,res)=>{   // for uploading multiple file use array in place of single
//     const {file} = req.files.filename;                          // can only upload single file because of this [0]
//     console.log({file});
//     const createFile = new multermodel({
//         file : baseUrl +req.files.filename
//     })
//     await createFile.save()
//     console.log(req.files.filename);
//     res.send("File uploaded successfully!")
// }) 
// app.listen(8000,(req,res)=>{
//     console.log("server is running on port 8000");
// })



const express = require("express")
const multer = require("multer")
const app = express()

const multermodel = require("./multermodel")
app.use(express.static("upload"))


const baseUrl = "http://localhost:8000/upload/"


const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/multer", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connect");
}).catch((err) => {
    console.log("error occured", err);
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../upload") // corrected the path of destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage:storage,
    fileFilter: function (req, file, cb) {                      // if u want to apply filter like no one can send jpg file or else we use this 
        if (file.mimetype == "application/pdf") {
            cb(null, true)

        } else {
            console.log("pdf only")
            return cb(null, false)
        }
    }
})



// //-------------------------------------------------------------uploading files using for of loop ------------------------------------------------------------


// app.post("/fileupload", upload.array("file", 10), async (req, res) => {          // corrected the parameter name in array function
//     try {
//         const files = req.files;   // here files is an array of object

//         // console.log(files);           // to check what we are getting in files

//         for (var value of files) {    // for of loop is used to iterarte over the every single object of the array

//             //  console.log(value.mimetype);   // here type of x is object 

//             const createFile = new multermodel({

//                 file: baseUrl + value.filename     // here x is object so we are using its property to store name 
//             })

//             await createFile.save();

//         } res.status(202).json({
//             message: "uploaded"
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })
// app.listen(8000, () => {
//     console.log("server is running on port 8000");
// })




// //-------------------------------------------------------------uploading file using map()----------------------------------------------------------------------------

app.post("/fileupload", upload.array("file", 10), async (req, res) => {
    try {
        const files = req.files
        //console.log(files);
        let b = files.map(test)
        async function test(value) {
            console.log(value.filename)
            const createnewfile = new multermodel({
                file: baseUrl + value.filename
            })
            await createnewfile.save()
        }
        res.status(202).json({
            message: "uploaded"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "please select pdf files", error })
    }
})

app.listen(8000, () => {
    console.log("server is running on port 8000");
})
