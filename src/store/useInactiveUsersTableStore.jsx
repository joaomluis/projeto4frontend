import { create } from 'zustand';
import useUserStore from './useUserStore';
import { toast } from 'react-toastify';
import ActiveUsersStore from './useActiveUsersTableStore';

const useInactiveUsersTableStore = create((set, get) => {
  const getInactiveUsers = async () => {
    const inactiveUsersRequest = "http://localhost:8080/project_backend/rest/users/inactiveUsers";
    const token = useUserStore.getState().token;

    try {
      const response = await fetch(inactiveUsersRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const inactiveUsers = await response.json();
        
        set(() => ({ data: inactiveUsers }));
        
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };



  const deleteUserPerma = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/users/removeUser`;
  try {
    const response = await fetch(deleteCategoryRequest, {
      method: "DELETE",
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
        token: token,
        username: id
      }
    });

    if (response.ok) {
      toast.info('User deleted permanently', {position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored"
      });
      
      getInactiveUsers(); 
      
    } else {
      const errorMessage = await response.text();
      console.error(errorMessage);
     
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    
  }};


  const restoreUser = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/users/restoreUser/${id}`;
  try {
    const response = await fetch(deleteCategoryRequest, {
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
      
      getInactiveUsers(); 
      ActiveUsersStore.getState().getActiveUsers();
      
    } else {
      const errorMessage = await response.text();
     
    }
  } catch (error) {
    console.error("Error restoring user:", error);
    
  }};


  
  

  return {
    headers: ['Username', 'Email', 'Phone', 'Role', 'User Edition'],
    data: [],
    tableTitle: 'Inactive Users',
    excludeKeys: ['idCategory'],
    displayOrder: ['username', 'email', 'phoneNumber', 'typeOfUser'],
    setData: (data) => set(state => ({ data })),
    getInactiveUsers,
    restoreUser,
    deleteUserPerma
  };
});

export default useInactiveUsersTableStore;