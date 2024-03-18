import React from 'react';
import './task.css';
import { useState } from 'react';
import SeeTaskModal from './seeTaskModal';
import useTasksStore from '../../store/useTasksStore';

const Task = ({ task, user }) => {


    let backgroundColorTask;

    if (task.priority === 100) {
        backgroundColorTask = '#44ca4d';
    } else if (task.priority === 200) {
        backgroundColorTask = '#fcff2e';
    } else if (task.priority === 300) {
        backgroundColorTask = '#ff4d4d';
    }

    const deleteTask = useTasksStore((state) => state.deleteTask);


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
       
        <button className="task_btn" style={{ color: 'black' }}>
          &#9998; {/* botão para editar a task */}
        </button>

        <button className="delete_btn" style={{ color: 'black' }} onClick={() => deleteTask(task.id)}>
        &#128465; {/* botão para apagar a task */}
        </button>
        {showModal && <SeeTaskModal setShowModal={setShowModal} task={task}/>}
    </div>
  );
};

export default Task;