import './task.css';
import { useState, useEffect } from 'react';
import CategoriesStore from '../../store/useCategoriesTableStore';
import useTasksStore from '../../store/useTasksStore';


function CreateTask({setShowModal, task}) {
   
   

    const colorMap = {
        100: '#44ca4d',
        200: '#fcff2e',
        300: '#ff4d4d',
      };

    const [selectedOption, setSelectedOption] = useState(task ? task.priority : 100);

    function handlePriorityChange(e) {
        const value = e.target.value;
        setSelectedOption(Number(e.target.value));
        setPriority(value);
      }

    const createTask = useTasksStore(state => state.createTask);
    const updateTask = useTasksStore(state => state.updateTask);

    const categories = CategoriesStore(state => state.data);



    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description  : '');
    const [initialDate, setInitialDate] = useState(task ? task.initialDate : new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(task ? task.endDate : ' ');
    const [priority, setPriority] = useState(task ? task.priority : 100);
    const [category, setCategory] = useState(task ? task.category.idCategory : '');
    
    const newTask = {
        title: title,
        description: description,
        initialDate: initialDate,
        endDate: endDate,
        priority: priority
    }

    

  return (
    <>
    <main className="taskMain">
    <div id="overlay-modal-category" onClick={() => setShowModal(false)}></div>
         <div className="createTask">
            
            <h2 id="task_creationTitle"></h2>
            
               <label htmlFor = "opcoes" className="descriptioLabelTask" id="current-category-label"></label>
             
            <label htmlFor="opcoes" className="descriptioLabelTask">Title:</label>
            <input type="text" 
            placeholder="Task Title" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
            
            <div>
               <label htmlFor="opcoes" className="descriptioLabelTask">Category:</label>
               <select 
                    id="category_element"
                    name="opcoes"
                    value={category}
                    onChange={(e) => {
                        const selectedCategory = e.target.value;
                        
                        
                        
                        setCategory(selectedCategory);
                    }}
                    >
                     <option value="" disabled>Select a Category</option>
                {categories.map((category) => (
                    
                    <option value={category.idCategory}>
                        {category.title}
                    </option>
                ))}
                </select>

           </div>
           <label htmlFor="opcoes" className="descriptioLabelTask">Description:</label>
            <textarea cols="30" 
            rows="14" 
            placeholder="Task Description" 
            id="description-task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}>
            </textarea>

            <div id="date_section">
               <div>
                  <p>Initial Date:</p>
                  <input type="date" 
                  id="initial_date"
                  value={initialDate}
                  onChange={(e) => setInitialDate(e.target.value)} />
               </div>
               <div id="end_date">
                  <p>End date:</p>
                  <input type="date" 
                  id="end_dates"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)} />
               </div>
            </div>

            <div id="color_section">
               <label id="label_color">Priority:</label>
               <div className="priority_div">
                  <input type="radio" 
                  name="priority" 
                  id="low_priority" 
                  value={100} 
                  checked={selectedOption === 100} 
                  onChange={handlePriorityChange}
                  />
                  <label htmlFor="low_priority">Low</label>
               </div>
               <div className="priority_div">
                  <input type="radio" 
                  name="priority" 
                  id="medium_priority" 
                  value={200} 
                  checked={selectedOption === 200} 
                  onChange={handlePriorityChange}
                  />
                  <label htmlFor="medium_priority">Medium</label>
               </div>
               <div className="priority_div">
                  <input type="radio" 
                  name="priority" 
                  id="high_priority" 
                  value={300} checked={selectedOption === 300} 
                  onChange={handlePriorityChange}
                  />
                  <label htmlFor="high_priority">High</label>
               </div>
               
               <div id="priority_color" style={{ backgroundColor: colorMap[selectedOption] }}></div>
            </div>

            <div className="buttons">
               <button className="btns_task" id="task_save" onClick={() => task ? updateTask(task.id, category, newTask) :  createTask(newTask, category)}>Save</button>
               <button className="btns_task" id="task_cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
         </div>
      </main>
    
    </>
  );
}

export default CreateTask;