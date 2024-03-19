import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CategoriesStore from '../../store/useCategoriesTableStore';
import ActiveUsersStore from '../../store/useActiveUsersTableStore';

function FiltersForTasks() {
 

    const categories = CategoriesStore(state => state.data);
    const users = ActiveUsersStore(state => state.data);

  return (
    <>
    <div className="filter">
               <div className="searchFields">
               <select id="category" onChange={(e) => console.log(e.target.value)}>
                   <option value="" disabled selected>Filter by Category</option>
                   {categories.map((category) => (
                    
                    <option value={category.idCategory}>
                        {category.title}
                    </option>
                ))}

                
                  
               </select>
               <select id="users">
                   <option value="" disabled selected>Filter by Users</option>
                     {users.map((user) => (
                      
                      <option value={user.id}>
                            {user.username}
                      </option>
                    ))}
                   
               </select>
               <div className="search_icon"> <p className="search-icon"><FontAwesomeIcon icon={faSearch} /></p></div>
               <div className="reset_search_icon"> <p className="reset-filter-icon">&#10006;</p></div>
            </div>
           </div>
    
    </>
    
  );
}

export default FiltersForTasks;