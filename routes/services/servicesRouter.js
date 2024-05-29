const express = require("express")
const router = express.Router()
const {
    createProblem,
    deleteProblem
} = require("./controller/serviceController")


router.post("/create-new-problem",createProblem)
router.delete("/delete-problem/:id",deleteProblem)







module.exports = router