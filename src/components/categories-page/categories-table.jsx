import {useState, useEffect} from 'react';
import useUserStore from '../../store/useUserStore.jsx';
import CategoryRow from './category-table-element.jsx';
import './categories-table.css';


function CategoriesTable({onDelete }) {

    const token = useUserStore(state => state.user.token);
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(false);



    useEffect(() => {
        getAllCategories(token);
      }, [reload]);


      const getAllCategories = async (token) => {
        const categoriesRequest = "http://localhost:8080/project_backend/rest/categories/getAllCategories";
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
            setCategories(categories);
            return categories;
          } else {
            const errorMessage = await response.text(); 
            console.error("Failed to fetch categories: " + errorMessage);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

  return (
    <>
        <main className="taskMain">
            
            <h1 id="title-category">Categories</h1>

            <div className="category_table">
                <table id="category_table">
                    <thead>
                        <tr>
                            <th id="th-head-left-corner">Title</th>
                            <th>Description</th>
                            <th>Author</th>
                            <th id="th-head-right-corner">Category Edition</th>
                        </tr>
                    </thead>
                    <tbody>
                    {categories.map(category => (
                        <CategoryRow 
                        key={category.idCategory} 
                        category={category} 
                        setCategories={setCategories}
                        setReload={setReload} />
                    ))}
                    </tbody>
                </table>
            </div>
      </main>
    </>
  )
}

export default CategoriesTable;