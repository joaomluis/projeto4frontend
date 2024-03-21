import './create-category.css';
import useUserStore from '../../store/useUserStore';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryStore from '../../store/useCategoriesTableStore';

function CreateCategory({onClose, category}) {

    const token = useUserStore(state => state.user.token);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      if (category) {
          setTitle(category.title);
          setDescription(category.description);
      }
    }, [category]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const createOrUpdateCategory = async (event) => {
    event.preventDefault();

    const url = category ? 
    `http://localhost:8080/project_backend/rest/categories/update/${category.idCategory}` : 
    "http://localhost:8080/project_backend/rest/categories/createCategory";

    const method = category ? "PUT" : "POST";

    const body = category ? 
      JSON.stringify({
          idCategory: category.idCategory,
          title: title,
          description: description
    }) : 
      JSON.stringify({
        title: title,
        description: description
      });
  
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Accept': '*/*',
                    "Content-Type": "application/json",
                    token: token
                },
                body: body
            });
    
            if (response.ok) {

              const message = category ? "Category updated successfully" : "Category created successfully";

              toast.info(message, {position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored"
                });
               
              CategoryStore.getState().fetchCategories();
                
              onClose();
              setTitle('');
              setDescription('');
                
            } else {
              const errorMessage = await response.text(); 
              setError(errorMessage);
              console.error("Failed to create category:", errorMessage);
  
              }
        } catch (error) {
            console.error("Error creating category:", error);
            return null;
        }
     }


  return (
    <>
      <main className="create">
          
        <div id="overlay-modal-category" onClick={onClose}></div>
        <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel" onClick={onClose}>&times;</button>
            <h2 id="task_creationTitle"></h2>
            <label htmlFor="title">Category Title:</label>

            <input type="text"
             placeholder="Category Title"
             id="title" 
             value={title} 
             onChange={handleTitleChange}
             required 
             />

            <label htmlFor="title">Description:</label>
            <textarea cols="30" 
            rows="14" 
            placeholder="Category Description" 
            id="description"
            value={description} 
            onChange={handleDescriptionChange}
            >
            </textarea>
                
            <div className="buttons">
            <button className="btns_task" id="category_save" onClick={createOrUpdateCategory}>Save</button>
            <button className="btns_task" id="category_delete" onClick={onClose}>Cancel</button>
            </div>
            
            <div id="error_creating_category">{error}</div>
              </div>
         </main>

    </>
  );
}

export default CreateCategory;