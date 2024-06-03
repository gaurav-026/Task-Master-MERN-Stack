//import model
const Task = require('../models/task');

exports.editFromTaskModel = async(req, res)=>{
    try{

        //fetch the id and update 
        const {id} = req.params;
        const {task, mark} = req.body;
        const  updatedTask = await Task.findByIdAndUpdate({_id: id}, {task, mark});
        console.log("Edited Task data is : ", updatedTask);
        res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            data: updatedTask
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Error while editing data"
        })
    }
}

