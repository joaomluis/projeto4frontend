import { useLocation } from "react-router-dom";
import { useState } from "react";
import CategoriesStore from "../../store/useCategoriesTableStore";
import InactiveUsersStore from "../../store/useInactiveUsersTableStore";
import ActiveUsersStore from "../../store/useActiveUsersTableStore";
import useTasksStore from "../../store/useTasksStore";
import CreateCategory from "../createCategory/create-category";
import Portal from "../portal/portal";
import NewUser from "../new-user/new-user";
import useUserStore from "../../store/useUserStore";


function DynamicRow({ item, excludeKeys, displayOrder}) {

  const userType = useUserStore((state) => state.userType);
  
  const location = useLocation();
  const idField = item.idCategory ? 'idCategory' : (item.username ? 'username' : 'id');
  const id = item[idField];

  //controlo do modal de editar categoria
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const toggleCreateCategory = () => {
    setIsCreateCategoryOpen(!isCreateCategoryOpen);
  };

  //controlo do modal de editar active user 
  const [isEditActiveUserOpen, setIsEditActiveUserOpen] = useState(false);
  const toggleEditActiveUser = () => {
    setIsEditActiveUserOpen(!isEditActiveUserOpen);
  };


  const buttonsCategories = (id) => [
    <button key={`${id}-edit`} className="edit_button" onClick={() => setIsCreateCategoryOpen(true)} >
      &#128214;
    </button>,
    <button key={`${id}-delete`} className="delete_button" onClick={() => CategoriesStore.getState().deleteCategory(id)} >
      &#128465;
    </button>
  ];

  const buttonsInactiveUsers = (id) => [
    <button key={`${id}-edit`} className="edit_button" onClick={() => InactiveUsersStore.getState().restoreUser(id)}>
      &#8634;
    </button>,
    userType === 'product_owner' ? (
      <button key={`${id}-delete`} className="delete_button" onClick={() => InactiveUsersStore.getState().deleteUserPerma(id)}>
        &#128465;
      </button>
    ) : null
  ];

  const buttonsActiveUsers = (id) => [
    <>
    <button key={`${id}-edit`} className="edit_button" onClick={() => setIsEditActiveUserOpen(true)}>
      &#128214;
    </button>
    <button key={`${id}-delete`} className="delete_button" onClick={() => ActiveUsersStore.getState().softDeleteUser(id)}>
      &#128465;
    </button>
    <button key={`${id}-deleteTasks`} className="delete_button" onClick={() => useTasksStore.getState().deleteTaskByUser(id)}>
      Delete Tasks
    </button>
    </>
  ];

  const buttonsInactiveTasks = (id) => [
    <button key={`${id}-edit`} className="edit_button" onClick={() => useTasksStore.getState().updateTaskActiveState(id)}>
      &#8634;
    </button>,
    <button key={`${id}-delete`} className="delete_button" onClick={() => useTasksStore.getState().deleteTaskPerma(id)}>
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
          } else if (key === 'id') {
            return <td key={`${item[idField]}-${key}`}>{item[key]}</td>;
          } else {
            return <td key={`${item[idField]}-${key}`}>{item[key]}</td>;
          }
        })}
        <td>
        {location.pathname === '/inactive-users' && buttonsInactiveUsers(id)}
        {location.pathname === '/categories' && buttonsCategories(id)}
        {isCreateCategoryOpen && (
        <Portal>
          <CreateCategory category={item} onClose={toggleCreateCategory}/>
        </Portal>
        )}
        {location.pathname === '/active-users' && userType === 'product_owner' && buttonsActiveUsers(id)}
        {isEditActiveUserOpen &&  (
        <Portal>
          <NewUser user={item} setShowNewUser={toggleEditActiveUser}/>
        </Portal>
        )}
        {location.pathname === '/inactive-tasks' && buttonsInactiveTasks(id)}
        </td>
      </tr>
    );
  }

  export default DynamicRow;