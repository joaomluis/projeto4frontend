import { create } from 'zustand';
import useUserStore from './useUserStore';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import inactiveUsersStore from './useInactiveUsersTableStore';

const useActiveUsersTableStore = create((set, get) => {
  const getActiveUsers = async () => {
    const activeUsersRequest = "http://localhost:8080/project_backend/rest/users/activeUsers";
    const token = useUserStore.getState().user.token;
   

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
    const token = useUserStore.getState().user.token;
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
      toast.info('User status set no inactive', {position: "top-center",
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



  getActiveUsers();
  

  const useEditModal = create(set => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
  }));

  const buttons = (id, ) => [
    <button key={`${id}-edit`} className="edit_button" onClick={() => useEditModal}>
      &#128214;
    </button>,
    <button key={`${id}-delete`} className="delete_button" onClick={() => softDeleteUser(id)}>
      &#128465;
    </button>
  ];



  return {
    headers: ['Username', 'Email', 'Phone', 'Role', 'User Edition'],
    data: [],
    tableTitle: 'Active Users',
    excludeKeys: ['idCategory'],
    displayOrder: ['username', 'email', 'phoneNumber', 'typeOfUser'],
    setData: (data) => set(state => ({ data })),
    getActiveUsers,
    buttons: buttons,
    useEditModal: useEditModal
  };
});

export default useActiveUsersTableStore;