import React from 'react';
import './task.css';

const Task = ({ task, user }) => {


  


    let backgroundColorTask;

    if (task.priority === 100) {
        backgroundColorTask = '#44ca4d';
    } else if (task.priority === 200) {
        backgroundColorTask = '#fcff2e';
    } else if (task.priority === 300) {
        backgroundColorTask = '#ff4d4d';
    }



    


  return (
    <div id={task.id} 
    className="task" 
    draggable="true" 
    style={{ backgroundColor: backgroundColorTask, color: 'black' }}
    onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', task.id);
        console.log(task.id);
      }}
    >
      <div className="task_title text-overflow-task">{task.title}</div>
      <div className="task_category text-overflow-task">{task.category.title}</div>
       
        <button className="task_btn" style={{ color: 'black' }}>
          &#9998; {/* botão para editar a task */}
        </button>

        <button className="delete_btn" style={{ color: 'black' }}>
        &#128465; {/* botão para apagar a task */}
        </button>
      
    </div>
  );
};

export default Task;