import TasksColumns from "./TasksColumns";
import useTasksStore from "../../store/useTasksStore";
import FiltersForTasks from "./filters-for-tasks";

function MainScrumPage() {

    const tasks = useTasksStore(state => state.activeTasksdata);

    

    return (
        <main>
        <FiltersForTasks />

        <TasksColumns tasks={tasks} />
        </main>
    );
}

export default MainScrumPage;