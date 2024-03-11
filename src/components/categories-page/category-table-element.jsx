import './categories-table.css';
import { useState } from 'react';
import useUserStore from '../../store/useUserStore';


function CategoryRow({ category, setReload }) {

    const [error, setError] = useState(null);
    const token = useUserStore(state => state.user.token);


    const handleDelete = async () => {
     
    setError(null);

  let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/categories/delete/${category.idCategory}`;
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
      console.log("Category deleted successfully");
   
      setReload(prev => !prev);
    } else {
      const errorMessage = await response.text();
      setError(errorMessage);
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    setError(error);
  }
    };
  
    return (
      <tr className="category_table_row">
        <td style={{ textAlign: "center" }}>{category.title}</td>
        <td style={{ textAlign: "center" }}>{category.description}</td>
        <td style={{ textAlign: "center" }}>{category.author.username}</td>
        <td style={{ textAlign: "center" }}>
          <button className="edit_button" onClick={() => window.location.href = `edit-category.html?categoryId=${category.idCategory}`}>
            &#128214;
          </button>
          <button className="delete_button" onClick={handleDelete}>
            &#128465;
          </button>
        </td>
      </tr>
    );
  }


export default CategoryRow;

