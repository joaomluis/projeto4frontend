import './create-category.css';

function CreateCategory({onClose}) {
  return (
    <>
      <main className="create">
          
        <div id="overlay-modal-category"></div>
        <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel" onClick={onClose}>&times;</button>
            <h2 id="task_creationTitle"></h2>
            <label htmlFor="title">Category Title:</label>
            <input type="text" placeholder="Category Title" id="title" required />
            <label htmlFor="title">Description:</label>
            <textarea cols="30" rows="14" placeholder="Category Description" id="description"></textarea>
                
            <div className="buttons">
            <button className="btns_task" id="category_save">Save</button>
            <button className="btns_task" id="category_delete" onClick={onClose}>Cancel</button>
            </div>
            
            <div id="error_creating_category"></div>
              </div>
         </main>

    </>
  );
}

export default CreateCategory;