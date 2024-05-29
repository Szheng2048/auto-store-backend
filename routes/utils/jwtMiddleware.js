const jwt = require("jsonwebtoken")
async function checkJwtToken(req,res,next){
    try {
        //check
        if(req.headers && req.headers.authorization){
            const jwtToken = req.headers.authorization.slice(7)
            const decodedJwt = jwt.verify(jwtToken,process.env.PRIVATE_JWT_KEY)
            res.locals.decodedJwt= decodedJwt
            next()
        } else {
            res.status(400).json({message:"no header found"})
        }
    } catch (error) {
        res.json({message:"failure", error:error.message})
    }
}

module.exports = {checkJwtToken}