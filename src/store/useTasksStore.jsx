import {create} from 'zustand';
import useUserStore from './useUserStore';



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
              }
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


     return {
        data: [],
        updateTaskState,
        getActiveTasks
        
      };

});



export default useTasksStore;