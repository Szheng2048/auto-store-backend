const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const userRouter = require("./routes/user/userRouter")
const serviceRouter = require("./routes/services/servicesRouter")
const mailjetRouter = require("./routes/Mailjet/Mailjet")

const app = express()

app.use(logger("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/users/", userRouter)
app.use("/service/",serviceRouter)
app.use("/mailjet/",mailjetRouter)



module.exports = app