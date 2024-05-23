const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const {
    isEmpty
} = require("../../utils/authMethods")
const { use } = require("../userRouter")

async function signUp(req,res,next){
    const {username,email,firstName,lastName,password,phoneNumber} = req.body
    const {errorObj} = res.locals
    if(!isEmpty(Object.keys(errorObj)))
        {
            return res.status(500).json({message:"error",errorObj})
        }
        try {
            const hash = await bcrypt.hash(password,10)
            const createdUser = new User({
                username,
                email,
                phoneNumber,
                firstName,
                lastName,
                password : hash
            })
            await createdUser.save()
            res.json({message:"User successfully created",payload:username})
        } catch (error) {
            res.status(500).json({message:"failed", error:error.message})
        }
}

async function signIn(req,res,next){
    const {user,password} = req.body
    const {errorObj} = res.locals
    if(Object.keys(errorObj).length > 0){
        return res.status(500).json({message:"failure",errorObj})
    }
    try {
        let foundUser = await User.findOne({email:user})
        if(!foundUser){
            foundUser = await User.findOne({username:user})
            if(!foundUser){
                return res.status(400).json({message:"failed please check username and password"})
            }
        }
        const comparedPassword = await bcrypt.compare(password,foundUser.password)
        console.log(comparedPassword)
        if(!comparedPassword){
            return res.json({message:"failed please check username and password"})
        } else {
            const jwtToken = jwt.sign(
                {
                    email:foundUser.email,
                    username:foundUser.username,
                    id:foundUser._id
                },
                process.env.PRIVATE_JWT_KEY,
                {
                    expiresIn: "1d"
                }
            )
            res.json({
                message:"logged in",
                payload: jwtToken
            })
        }
    } catch (error) {
        res.json({message:"error",error:error.message})
    }
}

async function getUserById(req,res){
    const id = req.params.id
    try {
        const foundUser = await User.findById(id)
        if(!foundUser){
            res.status(400).json({message:"no user found"})
        } else {
            res.json({message:"found user", payload:foundUser})
        }
    } catch (error) {
        res.json({message:"error",error:error.message})
    }
}

async function updateUser(req,res){
    try {
        const incomingData = req.body
        const {id} = res.locals.decodedJwt
        const updatedUser = await User.findByIdAndUpdate(id, incomingData, {new:true})
        res.json({message:"updated user", payload:updatedUser})
    } catch (error) {
        res.status(500).json({message:"error",error:error.message})
    }
}

module.exports = {
    signUp,
    signIn,
    getUserById,
    updateUser
}