import React, { useState, useContext } from 'react'
import { GoDotFill } from "react-icons/go";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Task.css'
import { AppContext } from '../context/AppContext';

const Task = () => {

  //fetching the data from useContext
  const {data, setData, completedTask, setCompletedTask} = useContext(AppContext);
  // const [completedTasks, setCompletedTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [editedMark, setEditedMark] = useState('');


  const taskCompleted = async (object, id) => {
    // console.log("Database completed task id is:", id);
    const response = await fetch(`https://task-master-mern-stack.onrender.com/api/v1/completedTask/${id}`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...object})
    }
    );
    const result = await response.json();
    // console.log("Completed Task moved to Analysis Page Successfully");
    setData(prevTasks => prevTasks.filter(task => task._id !== id));
    setCompletedTask(prevCompletedTasks => [...prevCompletedTasks, result.data]);
    // const updatedData = data.filter((object) => object.id !== id);
    // const doneTask = data.find((object) => object.id === id);
    // taskAnalyse(updatedData, doneTask);
    

  }

 //Delete The Task from the Database and SHOW POP UPs
  const handleDelete = async (id) => {

    // console.log("Database delete task id is:", id);
    const response = await fetch(`https://task-master-mern-stack.onrender.com/api/v1/deleteTask/${id}`, {method: "DELETE"});
    const result = await response.json();
    // console.log("Task Deleted Successfully");
    setData(prevTasks => prevTasks.filter(task => task._id !== id));
  }

  const handleEdit =(object, id) => {
    // console.log("Handle Edit Function called and the object data is", object);
    setEditTaskId(id);
    setEditedTask(object.task);
    setEditedMark(object.mark);
    setShowEditModal(true);
    // console.log("This is edit task id", id);
  }

  const handleEditSave = async () => {
    //mughe sab kuch editTaskid, editTask, editMark m save rakha h bs mughe use database m update krana h 
    const id = editTaskId;
    const object = {task: editedTask, mark: editedMark};
    // console.log("This is edit task id", editTaskId, editedTask, editedMark);
    const response = await fetch(`https://task-master-mern-stack.onrender.com/api/v1/updateTask/${id}`,
    { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object)
    }
    );
    const result = await response.json();
    // console.log(result);
    
    const updatedData = data.map((task) =>
      task._id === editTaskId ? { ...task, task: editedTask, mark: editedMark } : task
    );
    setData(updatedData);
    setShowEditModal(false);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  return (
    <>
      {
        data.length === 0 ? (<p className='dummy-text'>No Task Added</p>) : (
          data.map((object) => (
            <section className='task-card' key={object.id}>
              <div className='task-text'>
                <p className='task'>{object.task}</p>
                <p className='task-role'>{object.mark}</p>
              </div>
              <div className='buttons-spacing'>
                <button className='donebtn' onClick={() => taskCompleted(object, object._id)}>
                  <GoDotFill className='dot' /> Done
                </button>
                <button className='delete' onClick={() => handleEdit(object, object._id)}>
                  <FiEdit className='deleteicon' />
                </button>
                <button className='delete' onClick={() => handleDelete(object._id)}>
                  <IoRemoveCircleOutline className='deleteicon' />
                </button>
              </div>
            </section>
          ))

        )
      }

      {showEditModal && (
        <Modal show={showEditModal} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="eg: going to market after office"
                  autoFocus
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Mark Important</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="eg: very important"
                  autoFocus
                  value={editedMark}
                  onChange={(e) => setEditedMark(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className='addbtn2' onClick={handleCloseEdit}>
              Close
            </Button>
            <Button className='addbtn' onClick={handleEditSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}



    </>
  )
}

export default Task
