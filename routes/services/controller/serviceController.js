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
        res.json({message:"Appointment created", payload:email})
    } catch (error) {
        res.status(500).json({message:"failed",error:error.message})
    } 
}

async function deleteProblem(req,res,next){
    try {
        const {id} = req.params
        const deletedTicket = await Problem.findByIdAndDelete(id)
        res.json({message:"deleted problem", payload:deletedTicket})
    } catch (error) {
        res.status(500).json({message:"error",error:error.message})
    }
}

module.exports = {
    createProblem,
    deleteProblem
}