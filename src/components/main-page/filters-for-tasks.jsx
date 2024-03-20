import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CategoriesStore from '../../store/useCategoriesTableStore';
import ActiveUsersStore from '../../store/useActiveUsersTableStore';
import useTasksStore from '../../store/useTasksStore';

function FiltersForTasks() {
 

    const categories = CategoriesStore(state => state.data);
    const users = ActiveUsersStore(state => state.allUsers);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const filterTasks = useTasksStore(state => state.getFilteredTasks);
    const activeTasks = useTasksStore(state => state.getActiveTasks);

    const resetFilters = () => {
      setSelectedUser('');
      setSelectedCategory(''); 
    }


  return (
    <>
    <div className="filter">
               <div className="searchFields">
               <select id="category" onChange={(e) => setSelectedCategory(e.target.value)}>
                   <option value={selectedCategory} disabled selected>Filter by Category</option>
                   {categories.map((category) => (
                    
                    <option value={category.idCategory}>
                        {category.title}
                    </option>
                ))}

                
                  
               </select>
               <select id="users" onChange={(e) => setSelectedUser(e.target.value)}>
                   <option value={selectedUser} disabled selected>Filter by Users</option>
                     {users.map((user) => (
                      
                      <option value={user.id}>
                            {user.username}
                      </option>
                    ))}
                   
               </select>
               <div className="search_icon"> <p className="search-icon" onClick={() => {
                  filterTasks(selectedUser, selectedCategory);
                  }}>
                  <FontAwesomeIcon icon={faSearch} /></p></div>

               <div className="reset_search_icon"> <p className="reset-filter-icon" onClick={() => {
                 activeTasks();
                 
                 }}>
                  &#10006;</p></div>
            </div>
           </div>
    
    </>
    
  );
}

export default FiltersForTasks;