import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CategoriesStore from '../../store/useCategoriesTableStore';
import ActiveUsersStore from '../../store/useActiveUsersTableStore';
import useTasksStore from '../../store/useTasksStore';

function FiltersForTasks() {
 

    const categories = CategoriesStore(state => state.data);
    const users = ActiveUsersStore(state => state.allUsers);

    const { selectedCategory, selectedUser, setSelectedCategory, setSelectedUser } = useTasksStore();

    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleUserChange = (event) => {
      setSelectedUser(event.target.value);
    };

    const activeTasks = useTasksStore(state => state.getActiveTasks);

    const resetFilters = () => {
      setSelectedCategory("");
      setSelectedUser("");
      activeTasks();
    }

    


  return (
    <>
    <div className="filter" data-testid="tasks-filters">
               <div className="searchFields">
               <select id="category" onChange={handleCategoryChange}>
                   <option value={selectedCategory} disabled selected>Filter by Category</option>
                   {categories.map((category) => (
                    
                    <option value={category.idCategory}>
                        {category.title}
                    </option>
                ))}

                
                  
               </select>
               <select id="users" onChange={handleUserChange}>
                   <option value={selectedUser} disabled selected>Filter by Users</option>
                     {users.map((user) => (
                      
                      <option value={user.username}>
                            {user.username}
                      </option>
                    ))}
                   
               </select>
               <div className="search_icon"> <p className="search-icon" onClick={() => {
                  activeTasks(selectedUser, selectedCategory);
                  }}>
                  <FontAwesomeIcon icon={faSearch} /></p></div>

               <div className="reset_search_icon"> <p className="reset-filter-icon" onClick={() => {
                 resetFilters();
                 
                 }}>
                  &#10006;</p></div>
            </div>
           </div>
    
    </>
    
  );
}

export default FiltersForTasks;