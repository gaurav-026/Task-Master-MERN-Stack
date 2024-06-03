//model import
const Task = require('../models/task');


exports.addNewTask = async (req, res)=>{
    try{
        //fetch the data from the object
        const {task, mark} =req.body;

        const data = await Task.create({ task, mark});
        console.log(data);

        //if successfully sent then response true
        res.status(200).json({
            success: true,
            data: data,
            message: "Entry Created Successfully",
        })

    }
    catch(error){

        console.log(error);
        res.status(500).json({
            success: false,
            data: "Error while adding new Task",
            message: error.message,
        })
    }
}
