import {create} from 'zustand';
import useUserStore from './useUserStore';
import { toast } from 'react-toastify';



const useTasksStore = create((set) => {

   

    
    const getActiveTasks = async () => {
        const token = useUserStore.getState().user.token;

        let getTasksRequest = "http://localhost:8080/project_backend/rest/tasks/getActiveTasks";
     
        try {
     
           const response = await fetch(getTasksRequest, {
              method: "GET",
              headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 token: token
              }
           });
     
           if (response.ok) {
              const tasks = await response.json();
              
                set(() => ({ data: tasks }));

           } else {
              console.error("Failed to fetch tasks");
           }
        
        } catch (error) {
           console.error("Error fetching tasks:", error);
        }
     }

     getActiveTasks();


     const updateTaskState = async (taskId, state) => { 

        const token = useUserStore.getState().user.token;

        let updateTaskRequest = `http://localhost:8080/project_backend/rest/tasks/${taskId}/status`;
        try {
           const response = await fetch(updateTaskRequest, {
              method: "PUT",
              headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 token: token,
                 newState: state
              },
              
           });
     
           if (response.ok) {
              console.log("Task state updated");
              getActiveTasks();
           } else {
              console.error("Failed to update task state");
           }
        
        } catch (error) {
           console.error("Error updating task state:", error);
        }
     }

     const createTask = async (task, categoryId) => {

        const token = useUserStore.getState().user.token;
        let createTaskRequest = "http://localhost:8080/project_backend/rest/tasks/createTask";

        try {
            const response = await fetch(createTaskRequest, {
               method: "POST",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  token: token,
                  categoryId: categoryId
               }, 
                body: JSON.stringify(task),

            });
      
            if (response.ok) {
            
                toast.info("Task created successfully", {position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored"
                });

                getActiveTasks();
               
            } else {
               const error = await response.json();
                console.error("Failed to create task:", error);
            }
         
         } catch (error) {
            console.error("Error updating task state:", error);
         }
      
     }

     return {
        data: [],
        updateTaskState,
        getActiveTasks,
        createTask
        
      };

});



export default useTasksStore;