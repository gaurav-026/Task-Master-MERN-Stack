//use two models
const CompletedTasks = require("../models/CompletedTasks");
const Task = require("../models/task");

//completed task wale model m entry krani hai.
exports.addCompletedTask = async(req, res) =>{
    try{

        const {task, mark} = req.body;
        const {id} = req.params;
        const data = await CompletedTasks.create({task, mark});
        console.log(data);
        await Task.findByIdAndDelete(id);
        console.log("Completed Task id is: ", id);
        //if successfully sent then response true
        res.status(200).json({
            success: true,
            data: data,
            message: "Created Task Successfully in CompletedTask Model and Deleted from Task Model",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: "Error while adding completed task and deleting from task model"
        })
    }
}
