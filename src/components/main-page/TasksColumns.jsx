import React from 'react';
import './main-page.css';
import useTasksStore from '../../store/useTasksStore';
import Task from '../task/task';
import CreateTask from '../task/createTask';
import { useState } from 'react';
import Portal from '../portal/portal';

function TaskColumns({tasks}) {

   const [showModal, setShowModal] = useState(false);
    const showCreateTaskModal = () => {
        
        setShowModal(!showModal);
    
      };

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>   
     <div id="scrum_main">
         
         <section id="scrum_section">

            {showModal && <Portal><CreateTask setShowModal={setShowModal}  /></Portal> }
            <div className="column" 
            id="column1"
            onDragOver={(event) => {
               event.preventDefault();
           }}
           onDrop={(event) => {
               const taskId = event.dataTransfer.getData('text/plain');
               useTasksStore.getState().updateTaskState(taskId, 'toDo');
           }}>
               <div className="title">To Do</div>
               <section className="task_list" id="toDo"> 
               {tasks.filter(task => task.state === 'toDo').map(task => <Task key={task.id} task={task} />)}
               </section>
               
               <button id="btn_task" onClick={showCreateTaskModal}>&nbsp;+ New Task</button>
            </div>


            <div className="column" 
            id="column2"
            onDragOver={(event) => {
               event.preventDefault();
           }}
           onDrop={(event) => {
               const taskId = event.dataTransfer.getData('text/plain');
               
               useTasksStore.getState().updateTaskState(taskId, 'doing');
           }}>
               <div className="title">Doing</div>
               <section className="task_list" id="doing">
               {tasks.filter(task => task.state === 'doing').map(task => <Task key={task.id} task={task} />)}
               </section>
              
            </div>

            <div className="column" 
            id="column3"
            onDragOver={(event) => {
               event.preventDefault();
           }}
           onDrop={(event) => {
               const taskId = event.dataTransfer.getData('text/plain');
               // Add logic to move the task with id `taskId` to this column
               useTasksStore.getState().updateTaskState(taskId, 'done');
           }}>
               <div className="title">Done</div>
               <section className="task_list" id="done">
               {tasks.filter(task => task.state === 'done').map(task => <Task key={task.id} task={task} />)}
               </section>
            </div>
         </section>
           
      </div>


    </>
  );
}

export default TaskColumns;