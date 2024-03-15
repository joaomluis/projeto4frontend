import { useLocation } from "react-router-dom";
import { useState } from "react";
import CategoriesStore from "../../store/useCategoriesTableStore";
import CreateCategory from "../createCategory/create-category";
import Portal from "../portal/portal";


function DynamicRow({ item, excludeKeys, displayOrder, useEditModal}) {
  
  const location = useLocation();
 
  const idField = item.idCategory ? 'idCategory' : 'username';
  const id = item[idField];

  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const toggleCreateCategory = () => {
    setIsCreateCategoryOpen(!isCreateCategoryOpen);
  };


  const buttonsCategories = (id ) => [
    <button key={`${id}-edit`} className="edit_button" onClick={() => setIsCreateCategoryOpen(true)} >
      &#128214;
    </button>,
    <button key={`${id}-delete`} className="delete_button" onClick={() => CategoriesStore.getState().deleteCategory(id)} >
      &#128465;
    </button>
  ];
  
    return (
      <tr>
        {displayOrder.filter(key => !excludeKeys.includes(key)).map(key => {
          
          if (key === 'author') {
            return <td key={`${item[idField]}-${key}`}>{item[key].username}</td>;
          } else if (key === 'username') {
            return <td key={`${item[idField]}-${key}`}>{item[key]}</td>;
          } else {
            return <td key={`${item[idField]}-${key}`}>{item[key]}</td>;
          }
        })}
        <td>
        {location.pathname === '/categories' && buttonsCategories(id)}
        {isCreateCategoryOpen && (
        <Portal>
          <CreateCategory category={item} onClose={toggleCreateCategory}/>
        </Portal>
        )}
        </td>
      </tr>
    );
  }

  export default DynamicRow;