import { create } from 'zustand';
import useUserStore from './useUserStore';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const useCategoriesTableStore = create((set, get) => {
  const fetchCategories = async () => {
    const categoriesRequest = "http://localhost:8080/project_backend/rest/categories/getAllCategories";
    const token = useUserStore.getState().user.token;

    try {
      const response = await fetch(categoriesRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const categories = await response.json();
        
        set(() => ({ data: categories }));
        
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };



  const deleteCategory = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/categories/delete/${id}`;
  try {
    const response = await fetch(deleteCategoryRequest, {
      method: "DELETE",
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
        token: token
      }
    });

    if (response.ok) {
      toast.info('Category deleted successfully', {position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored"
      });
      console.log("Category deleted successfully");
   
      
    } else {
      const errorMessage = await response.text();
     
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    
  }};




  fetchCategories();

  const useEditModal = create(set => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
  }));

  const buttons = (id ) => [
    <button key={`${id}-edit`} className="edit_button" onClick={() => useEditModal}>
      &#128214;
    </button>,
    <button key={`${id}-delete`} className="delete_button" onClick={() => deleteCategory(id)}>
      &#128465;
    </button>
  ];



  return {
    headers: ['Title', 'Description', 'Author', 'Category Edition'],
    data: [],
    tableTitle: 'Categories',
    excludeKeys: ['idCategory'],
    displayOrder: ['title', 'description', 'author'],
    setData: (data) => set(state => ({ data })),
    fetchCategories,
    buttons: buttons,
    useEditModal: useEditModal
  };
});

export default useCategoriesTableStore;