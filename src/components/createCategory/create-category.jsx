import './create-category.css';
import useUserStore from '../../store/useUserStore';
import { useState } from 'react';

function CreateCategory({onClose}) {

    const token = useUserStore(state => state.user.token);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const createCategory = async (event) => {
    event.preventDefault();

        let createCategoryRequest = "http://localhost:8080/project_backend/rest/categories/createCategory";
  
        try {
            const response = await fetch(createCategoryRequest, {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    "Content-Type": "application/json",
                    token: token
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            });
    
            if (response.ok) {
                 console.log("Category created successfully");
                
                onClose();
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                
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
          
        <div id="overlay-modal-category"></div>
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
            <button className="btns_task" id="category_save" onClick={createCategory}>Save</button>
            <button className="btns_task" id="category_delete" onClick={onClose}>Cancel</button>
            </div>
            
            <div id="error_creating_category">{error}</div>
              </div>
         </main>

    </>
  );
}

export default CreateCategory;