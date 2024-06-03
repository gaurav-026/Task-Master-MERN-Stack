const express = require('express');
const { addNewTask } = require('../controller/addNewTask');
const { deleteTask } = require('../controller/deleteTask');
const { addCompletedTask, deletefromTaskModel } = require('../controller/completedTask');
const { editFromTaskModel } = require('../controller/editTask');
const { getAllTasks } = require('../controller/getTask');

const router = express.Router();

router.get('/getAllTasks', getAllTasks);
router.post('/addNewTask', addNewTask);
router.delete('/deleteTask/:id', deleteTask);
router.post('/completedTask/:id',addCompletedTask);
router.put('/updateTask/:id', editFromTaskModel);
router.get('/default', (req, res)=>{
    res.send('This is default router');
})

module.exports = router;