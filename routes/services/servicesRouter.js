const express = require("express")
const router = express.Router()
const {
    createProblem,
    deleteProblem
} = require("./controller/serviceController")


router.post("/create-new-problem",createProblem)
router.post("/delete-problem",deleteProblem)







module.exports = router