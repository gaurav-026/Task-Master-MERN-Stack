const Task = require('../models/task');
const CompletedTasks = require("../models/CompletedTasks");
exports.getAllTasks = async (req, res)=>{
    try{
        //fetch from database
        const tasks = await Task.find({});
        console.log("Fetched Tasks are: ", tasks);
        const completedtasks = await CompletedTasks.find({});
        console.log("Fetched Completed Tasks are: ", completedtasks);
        res.status(200).json({
            success: true,
            data: {tasks, completedtasks},
            message: "All Tasks are fetched from Database"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Unable to Fetch All Tasks"
        })
    }
}

