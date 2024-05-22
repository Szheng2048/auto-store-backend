const express = require("express")
const router = express.Router()
const {
    signUp,
    signIn,
    getUserById,
    updateUser
} = require("./controller/userController")
const {checkIsUndefinedFunc} = require("./helpers/checkisUndefined")
const {checkIsEmptyFunc} = require("./helpers/checkIsEmpty")
const {
    checkIsEmailFunc,
    checkIsStrongPasswordFunc,
    checkIsValidFirstNameFunc,
    checkIsValidLastNameFunc,
    checkIsValidUsername,
    checkIsValidPhoneNumber
} = require("./helpers/authMiddleware")
const {checkJwtToken} = require("../utils/jwtMiddleware")

router.get("/",(req,res)=>{
    res.json({message:"connected to user app"})
})

router.post("/sign-up",
    checkIsUndefinedFunc,
    checkIsEmptyFunc,
    checkIsEmailFunc,
    checkIsValidPhoneNumber,
    checkIsStrongPasswordFunc,
    checkIsValidLastNameFunc,
    checkIsValidFirstNameFunc,
    checkIsValidUsername,
    signUp
)

router.post("/sign-in",
    checkIsUndefinedFunc,
    checkIsEmptyFunc,
    signIn
)

router.get("/get-user-by-id/:id",
    checkJwtToken,
    getUserById
)

router.put("/update-user", checkJwtToken,updateUser)

module.exports = router