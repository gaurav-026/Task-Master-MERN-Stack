const mongoose = require('mongoose');
const completedTaskSchema = new mongoose.Schema({
    // id:{
    //     type: String,
    //     required: true,
    // },
    task:{
        type: String,
        required: true,
        maxLength: 200,

    },
    mark:{
        type: String,
        required: true,
        maxLength: 50,
    },

})

module.exports = mongoose.model("CompletedTasks", completedTaskSchema);