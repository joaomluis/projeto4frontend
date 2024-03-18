import TasksColumns from "./TasksColumns";
import useTasksStore from "../../store/useTasksStore";

function MainScrumPage() {

    const tasks = useTasksStore(state => state.activeTasksdata);
    

    return (
        <main>
        <TasksColumns tasks={tasks} />
        </main>
    );
}

export default MainScrumPage;