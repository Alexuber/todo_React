import { useState, useEffect, useRef } from 'react';
import { Modal } from 'shared/components/Modal/Modal';
import TodoForm from 'components/TodoForm/TodoForm';
import TodoList from 'components/TodoList/TodoList';
import ModalContent from 'components/ModalContent/ModalContent';
import getDataFromLocalStorage from 'shared/utils/localStorage';
import './styles/style.scss';

const INITIAL_STATE = { todos: [], showModal: false };

export const App = () => {
  const [todos, setTodos] = useState(() =>
    getDataFromLocalStorage('todos', INITIAL_STATE.todos)
  );

  const [showModal, setShowModal] = useState(INITIAL_STATE.showModal);
  const [todoDetails, setTodoDetails] = useState({});

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = data => {
    const newTodo = { ...data, isDone: false };
    setTodos([...todos, newTodo]);
  };

  const refreshStatus = index => {
    const oldTodos = [...todos];

    const refreshed = oldTodos[index];

    refreshed.isDone = !refreshed.isDone;

    oldTodos.splice(index, 1, refreshed);
    setTodos(oldTodos);
  };

  const onItemClick = (event, index) => {
    setTodoDetails({ ...todos[index], id: index });

    if (event.target.nodeName === 'INPUT') {
      return;
    }
    setShowModal(prevState => {
      return !prevState;
    });
  };

  const { title, description, isDone, id } = todoDetails;

  return (
    <section>
      <TodoForm addNewTodo={addNewTodo} />
      <TodoList
        todos={todos}
        refreshStatus={refreshStatus}
        showModal={onItemClick}
      />
      {showModal && (
        <Modal hideModal={onItemClick}>
          <ModalContent
            onClick={onItemClick}
            refreshStatus={refreshStatus}
            id={id}
            isDone={isDone}
            description={description}
            title={title}
          />
        </Modal>
      )}
    </section>
  );
};
