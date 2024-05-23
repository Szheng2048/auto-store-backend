const Problem = require("../model/Service")

async function createProblem(req,res,next){
    try {
        const {user,email,appointment,problems} = req.body
        const createdAppointment = new Problem({
            user,
            email,
            appointment,
            problems
        })
        await createdAppointment.save()
        res.json({message:"Appointment created", payload:_id})
    } catch (error) {
        res.status(500).json({message:"failed",error:error.message})
    } 
}

async function deleteProblem(req,res,next){
    try {
        const solvedProblem = req.body._id
        const deletedTicket = await Problem.findByIdAndDelete(solvedProblem)
        res.json({message:"deleted user", payload:deletedTicket})
    } catch (error) {
        res.status(500).json({message:"error",error:error.message})
    }
}

module.exports = {
    createProblem,
    deleteProblem
}