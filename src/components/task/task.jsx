import React from 'react';
import './task.css';
import { useState } from 'react';
import SeeTaskModal from './seeTaskModal';
import useTasksStore from '../../store/useTasksStore';
import CreateTask from './createTask';
import Portal from '../portal/portal';
import useUserStore from '../../store/useUserStore';

const Task = ({ task }) => {

  

  const userType = useUserStore((state) => state.userType);
  const username = useUserStore((state) => state.username);
 

  const [showUpdateModal, setUpdateShowModal] = useState(false);
    const showUpdateTaskModal = () => {
        
      setUpdateShowModal(true);
    
      };


    let backgroundColorTask;

    if (task.priority === 100) {
        backgroundColorTask = '#44ca4d';
    } else if (task.priority === 200) {
        backgroundColorTask = '#fcff2e';
    } else if (task.priority === 300) {
        backgroundColorTask = '#ff4d4d';
    }

    const updateTaskActiveState = useTasksStore((state) => state.updateTaskActiveState);
    


    const [showModal, setShowModal] = useState(false);
    const handleDoubleClick = () => {
        
        setShowModal(true);
    
      };
    


  return (
    <div id={task.id}
    item={task}
    className="task" 
    draggable="true" 
    style={{ backgroundColor: backgroundColorTask, color: 'black' }}
    onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', task.id);
        
      }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="task_title text-overflow-task">{task.title}</div>
      <div className="task_category text-overflow-task_category">{task.category.title}</div>
       
      { (userType === 'scrum_master' || userType === 'product_owner' || username === task.author.username ) && (
      <button className="task_btn" style={{ color: 'black' }} onClick={() => showUpdateTaskModal()}>
      &#9998; {/* botão para editar a task */}
      </button>
    )}

        { (userType === 'scrum_master' || userType === 'product_owner') && (
        <button className="delete_btn" style={{ color: 'black' }} onClick={() => updateTaskActiveState(task.id)}>
        &#128465; {/* botão para apagar a task */}
        </button>
        )}
        {showModal && <Portal> <SeeTaskModal setShowModal={setShowModal} task={task}/> </Portal>}  
        {showUpdateModal && <Portal> <CreateTask setShowModal={setUpdateShowModal} task={task} /> </Portal>}
    </div>
  );
};

export default Task;