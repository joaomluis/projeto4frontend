import { render, screen, fireEvent } from '@testing-library/react';

import TaskColumns from './components/main-page/TasksColumns';
import CreateTask from './components/task/createTask';
import FiltersForTasks from './components/main-page/filters-for-tasks';
import useTasksStore from './store/useTasksStore';
import InactiveTasksButton from './components/sidebar/sidebar-main-buttons/inactiveTasksButton';




test('renders TaskColumns component', () => {

  const mockTasks = [
    {
      id: 1,
      is_Active: true,
      priority: 100,
      category: 
      {
        id: 1709477186856,
        title: 'Category 1',
        description: 'Category 1 description'
      },
      endDate: '2024-09-30',
      initialDate: '2024-09-20',
      author: 
      {
        id: 1709476,
        name: 'Author 1',
      },
      state: 'toDo',

    }
  ];

  render(<TaskColumns tasks={mockTasks}/>); 
  const element = screen.getByTestId('task-columns');
  expect(element).toBeInTheDocument();
});


test('renders CreateTask component', () => {
    render(<CreateTask />); 
    const element = screen.getByTestId('create-task');
    expect(element).toBeInTheDocument();
  });

  test('renders FiltersForTasks component', () => {
    render(<FiltersForTasks />); 
    const element = screen.getByTestId('tasks-filters');
    expect(element).toBeInTheDocument();
  });

  /*
  jest.mock('./store/useTasksStore');


test('calls getInactiveTasks on button click', () => {
  const getInactiveTasksMock = jest.fn();
  useTasksStore.mockReturnValue({ getInactiveTasks: getInactiveTasksMock });

  const { getByTestId } = render(<InactiveTasksButton />);
  const button = getByTestId('inactive-tasks-button');

  fireEvent.click(button);

  expect(getInactiveTasksMock).toHaveBeenCalled();
});
*/