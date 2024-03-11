import React from 'react';
import './main-page.css';

function TaskColumns() {
  return (
    <>   
     <div id="scrum_main">
         
         <section id="scrum_section">
            <div className="column" id="column1">
               <div className="title">To Do</div>
               <section className="task_list" id="toDo"></section>
               <button id="btn_task">&nbsp;+ New Task</button>
            </div>
            <div className="column" id="column2">
               <div className="title">Doing</div>
               <section className="task_list" id="doing"></section>
            </div>
            <div className="column" id="column3">
               <div className="title">Done</div>
               <section className="task_list" id="done"></section>
            </div>
         </section>
      </div>


    </>
  );
}

export default TaskColumns;