import TasksColumns from "./TasksColumns";
import useTasksStore from "../../store/useTasksStore";
import FiltersForTasks from "./filters-for-tasks";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import useCategoriesTableStore from '../../store/useCategoriesTableStore';
import useActiveUsersTableStore from '../../store/useActiveUsersTableStore';

function MainScrumPage() {

    const tasks = useTasksStore(state => state.activeTasksdata);

    const navigate = useNavigate();
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const getCategories = useCategoriesTableStore(state => state.fetchCategories);
    const getAllUsers = useActiveUsersTableStore(state => state.getAllUsers);

    
    


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        };
        getCategories();
        getAllUsers();
    }, [isLoggedIn, navigate]);

    

    return (
        <main>
        <FiltersForTasks />

        <TasksColumns tasks={tasks} />
        </main>
    );
}

export default MainScrumPage;