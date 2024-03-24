import { create } from 'zustand';
import useUserStore from './useUserStore';
import { toast, Slide } from 'react-toastify';
import { useEffect, useState } from 'react';
import inactiveUsersStore from './useInactiveUsersTableStore';



const useActiveUsersTableStore = create((set, get) => {
  const getActiveUsers = async () => {

    const token = useUserStore.getState().token;
    const activeUsersRequest = "http://localhost:8080/project_backend/rest/users/activeUsers";
    
   

    try {
      const response = await fetch(activeUsersRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const activeUsers = await response.json();
        
        set(() => ({ data: activeUsers }));
        
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };



  const softDeleteUser = async (id) => {

    const token = useUserStore.getState().token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/users/deleteUser`;
  try {
    const response = await fetch(deleteCategoryRequest, {
      method: "PUT",
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
        token: token,
        username: id
      }
    });

    if (response.ok) {
      toast.info(`${id} status set to inactive`, {position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored"
      });
      
      getActiveUsers();
      inactiveUsersStore.getState().getInactiveUsers();
      
    } else {
      const errorMessage = await response.text();
     
    }
  } catch (error) {
    console.error("Error disabling user account:", error);
    
  }};

  const updateProfile = async (username, updatedUserData) => {

    const token = useUserStore.getState().token;

    try {
        const response = await fetch("http://localhost:8080/project_backend/rest/users/updateProfilePO", {
            method: 'PUT',
            headers: {
             'Content-Type': 'application/json',
             'Accept': '*/*',
             token:token,
             username:username
            },
            body: JSON.stringify(updatedUserData)
        });
 
        if (response.ok) {
            const data = await response.json();
            
            toast.info('User updated successfully', {position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            transition: Slide,
            theme: "colored"
            });

            getActiveUsers();
        }else{
          const errorMessage = await response.text();
          console.log(errorMessage);
          return errorMessage;
       }
     
    }catch(error){
       console.log("Something went wrong");
    }
 }

 const createUser = async (user) => {

  const token = useUserStore.getState().token;

  const url = `http://localhost:8080/project_backend/rest/users/addUserByPO`;
  

      try {
          const response = await fetch(url, {
              method: "PUT",
              headers: {
                  'Accept': '*/*',
                  "Content-Type": "application/json",
                  token: token
              },
              body: JSON.stringify(user)
          });
  
          if (response.ok) {

            

            toast.info('User created successfully', {position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              transition: Slide,
              theme: "colored"
              });

              getActiveUsers();

              return Promise.resolve();
             
              
          } else {
            const errorMessage = await response.text(); 
            
            console.error("Failed to create user:", errorMessage);

            toast.error(errorMessage, {position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              transition: Slide,
              theme: "colored"
              })

            return Promise.reject(new Error(errorMessage));

            }
      } catch (error) {
          console.error("Error creating user:", error);
          return null;
      }
   }

   const getAllUsers = async () => {

    const token = useUserStore.getState().token;

    const allUsersRequest = "http://localhost:8080/project_backend/rest/users/all";
  
    try {
      const response = await fetch(allUsersRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const allUsers = await response.json();
        
        set(() => ({ allUsers: allUsers }));

        
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
   }
   


  return {
    headers: ['Username', 'Email', 'Phone', 'Role', 'User Edition'],
    data: [],
    allUsers: [],
    tableTitle: 'Active Users',
    excludeKeys: ['idCategory'],
    displayOrder: ['username', 'email', 'phoneNumber', 'typeOfUser'],
    setData: (data) => set(state => ({ data })),
    setAllUsers: (allUsers) => set(state => ({ allUsers })),
    getActiveUsers,
    getAllUsers,
    softDeleteUser,
    updateProfile,
    createUser
  };
});

export default useActiveUsersTableStore;