import {create} from 'zustand';
import useUserStore from './useUserStore';
import { toast, Slide } from 'react-toastify';



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
              
                set(() => ({ activeTasksdata: tasks }));

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
                transition: Slide,
                theme: "colored"
                });

                getActiveTasks();
               
            } else {
               const error = await response.text();
                console.error("Failed to create task:", error);

                toast.error(error, {position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                transition: Slide,
                theme: "colored"
                });
            }
         
         } catch (error) {
            console.error("Error creating task:", error);
         }
      
     }

     const deleteTask = async (taskId) => {
        console.log(taskId);

        const token = useUserStore.getState().user.token;
        let setTaskStatusRequest = `http://localhost:8080/project_backend/rest/tasks/${taskId}/softDelete`;

        try {
            const response = await fetch(setTaskStatusRequest, {
               method: "PUT",
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  token: token,
                  taskId: taskId
               }, 
                

            });
      
            if (response.ok) {
            
                toast.info("Task active state updated successfully", {position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored"
                });

                getActiveTasks();
               
            } else {
               const error = await response.text();
                

                toast.error(error, {position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                transition: Slide,
                theme: "colored"
                });
            }
         
         } catch (error) {
            console.error("Error updating task state:", error);
         }

     }

     
    // SEPARADOR CONTEUDO DA TABELA COM AS INACTIVE TASKS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    const getInactiveTasks = async () => {
        const inactiveTasksRequest = "http://localhost:8080/project_backend/rest/tasks/getInactiveTasks";
        const token = useUserStore.getState().user.token;
    
        try {
          const response = await fetch(inactiveTasksRequest, {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              token: token
            }
          });
    
          if (response.ok) {
            const inactiveTasks = await response.json();
            
            set(() => ({ data: inactiveTasks }));
            
          }
        } catch (error) {
          console.error('Failed to fetch tasks', error);
        }
      };
    
    
    
      const deleteTaskPerma = async (id) => {
        console.log(id);
        const token = useUserStore.getState().user.token;
        let deleteTaskRequest = `http://localhost:8080/project_backend/rest/tasks/${id}/hardDeleteTask`;
      try {
        const response = await fetch(deleteTaskRequest, {
          method: "DELETE",
          headers: {
            'Accept': '*/*',
            "Content-Type": "application/json",
            token: token,
            username: id
          }
        });
    
        if (response.ok) {
          toast.info('Task deleted permanently', {position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored"
          });
          
          getInactiveTasks();
          
        } else {
          const error = await response.text();
          console.error(error);
          toast.error(error, {position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                transition: Slide,
                theme: "colored"
                });
         
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        
      }};
    
    
      const restoreUser = async (id) => {
        const token = useUserStore.getState().user.token;
        let deleteTaskRequest = `http://localhost:8080/project_backend/rest/tasks/${id}/hardDeleteTask`;
      try {
        const response = await fetch(deleteTaskRequest, {
          method: "PUT",
          headers: {
            'Accept': '*/*',
            "Content-Type": "application/json",
            token: token
          }
        });
    
        if (response.ok) {
          toast.info(`${id} status set to active`, {position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored"
          });
          
          
          
        } else {
          const errorMessage = await response.text();
         
        }
      } catch (error) {
        console.error("Error restoring user:", error);
        
      }};
    
    
      getInactiveTasks();


     

     return {
        activeTasksdata: [],
        data: [],
        updateTaskState,
        getActiveTasks,
        getInactiveTasks,
        deleteTaskPerma,
        createTask,
        deleteTask,
        headers: ['Title', 'Description', 'Initial Date', 'End Date', 'Author', 'Task Edition'],
        tableTitle: 'Inactive Tasks',
        excludeKeys: ['category'],
        displayOrder: ['title', 'description', 'initialDate', 'endDate', 'author'],
        setData: (data) => set(state => ({ data })),

        
      };

});



export default useTasksStore;