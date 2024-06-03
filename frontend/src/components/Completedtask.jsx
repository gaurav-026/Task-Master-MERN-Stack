import React, { useContext } from 'react'
import { IoRemoveCircleOutline } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { AppContext } from '../context/AppContext';
const Completedtask = () => {

  const { completedTask, setCompletedTask } = useContext(AppContext);
  const handleDeleteCompletedTask = async (id) => {
    // console.log("Database delete task id is:", id);
    const response = await fetch(`https://task-master-mern-stack.onrender.com/api/v1/deleteTask/${id}`, {method: "DELETE"});
    const result = await response.json();
    // console.log("Task Deleted Successfully");
    // setData(prevTasks => prevTasks.filter(task => task._id !== id));
        setCompletedTask(prevCompletedTasks => prevCompletedTasks.filter(task => task._id !== id));
  }
  return (
    <>
      {
        completedTask.length === 0 ? (<p className='dummy-text'>No Task Completed</p>) : (
          completedTask.map((object, index) => (
            <section className='task-card' key={object.id} >
              <div className='task-text'>
                <p className='task'>{object.task}</p>
                <p className='task-role'>{object.mark}</p>
              </div>
              <div className='buttons-spacing'>
                <MdDownloadDone className='successicon' />
                <button className='delete' onClick={() => handleDeleteCompletedTask(object._id)}>
                  <IoRemoveCircleOutline className='deleteicon' />
                </button>
              </div>
            </section>
          )
          )
        )
      }
    </>
  )

}

export default Completedtask
