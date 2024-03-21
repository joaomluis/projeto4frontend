import TasksColumns from "./TasksColumns";
import useTasksStore from "../../store/useTasksStore";
import FiltersForTasks from "./filters-for-tasks";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

function MainScrumPage() {

    const tasks = useTasksStore(state => state.activeTasksdata);

    const navigate = useNavigate();
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    

    return (
        <main>
        <FiltersForTasks />

        <TasksColumns tasks={tasks} />
        </main>
    );
}

export default MainScrumPage;