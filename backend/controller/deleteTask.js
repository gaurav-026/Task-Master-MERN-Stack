const Task = require('../models/task');
const CompletedTasks = require('../models/CompletedTasks');
exports.deleteTask = async (req, res) =>{
    try{
        //fetch the object
        const {id} = req.params;
        console.log("Deleted Task id is: ", id);
        //Deleting from task model
        // console.log("Checking and deleting from Task model..")
        const deleteTaskId = await Task.findById(id);
        if(deleteTaskId){
            await Task.findByIdAndDelete(id);
            console.log("Task Deleted Successfully");
            return res.status(200).json({
                success: true,
                message: "Task Deleted Successfully",
            })
        }
        //Deleting from CompletedTask Model
        
        // console.log("Checking and deleting from CompletedTask model..")
        const deleteCompletedTaskId = await CompletedTasks.findById(id);
        if(deleteCompletedTaskId){
            await CompletedTasks.findByIdAndDelete(id);
            console.log("Completed Task Deleted Successfully");
            return res.status(200).json({
                success: true,
                message: "Completed Task Deleted Successfully",
            })
        }
        
        res.status(200).json({
            success: true,
            message: "No Task Found",
        })
        console.log("No Tasks Found to this id");
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
            data: "Couldn't delete the task",
            
        })
    }
}