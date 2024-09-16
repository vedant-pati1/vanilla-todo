const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const cors = require("cors")
const z = require('zod')
require('dotenv').config()

const { UserModel, todoModel } = require("./db")
const { auth, JWT_SECRET } = require("./auth")

//zod schema
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})


async function connection() {
    await mongoose.connect("mongodb+srv://vedantpatil1709:RPJ3GQTzW25woHLJ@cluster0.6wa7d.mongodb.net/todo-app")
}
// should be in try catch 
connection();

const app = express();
app.use(express.static(__dirname+"/public/login"))
app.use(cors())
app.use(express.json())

const validator = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const validatedObject = userSchema.safeParse({
        email:email,
        password:password
    })
    //add conditions over here
    if (validatedObject.success) {
        next()
        return
    }
    res.status(403).json({
        message: "Add appropriate email or password"
    })
}
app.get('/',(req,res)=>{
    res.send("still working")
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/public/login/login.html");
})

app.post("/signup", validator, async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try{
    await UserModel.create({
        email, password
    })
}
catch(e){
    console.log(e)
    return
}

    res.json({
        message: "user created"
    })
})

app.post("/signin", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password
    })

    if (response) {
        const token = jwt.sign({
            id: response._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "user not found"
        })
    }
})

app.post("/todo", auth, async (req, res) => {
    const title = req.body.title
    const done = req.body.done


    await todoModel.create({
        userId: req.userId,
        title: title,
        done: done
    })

    res.json({
        message:"todo created"
    })
})

app.get("/todos",auth,async (req,res)=>{
    const userId = req.userId

    const resposnse = await todoModel.find({
        userId: userId
    })
    res.json(resposnse)
})

app.listen(process.env.PORT,()=>{
    console.log("server started")
})