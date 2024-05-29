const express = require("express")
const router = express.Router()
const {checkJwtToken} = require("../utils/jwtMiddleware")
const mailjet = require("node-mailjet").apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
)
router.post("/send-message",checkJwtToken, async(req,res)=>{
    try {
        const request = mailjet
                    .post("send",{version:"v3.1"})
                    .request({
                        Messages:[
                            {
                                From:{
                                    Email:"stevenzheng525525@gmail.com",
                                    Name:"Jerome Leroy"
                                },
                            To:[
                                {
                                    Email:req.body.recipient,
                                    Name:"you"
                                }
                            ],
                            Subject:"Appointment Scheduled",
                                TextPart:req.body.message,
                            }
                        ]
                    })
                    const result = await request
                    res.json(result.body)
    } catch (e) {
        console.log(e)
    }
})


module.exports = router