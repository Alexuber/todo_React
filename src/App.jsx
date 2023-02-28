import './styles/style.scss';
import { Button } from './shared/Button/Button';
import { Modal } from 'shared/Modal/Modal';
import { useState, useEffect, useRef } from 'react';

const INITIAL_STATE = { todos: [] };

export const App = () => {
  const [todos, setTodos] = useState(INITIAL_STATE.todos);
  return (
    <>
      <p>toDo</p>
    </>
  );
};
