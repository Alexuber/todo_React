import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoForm.module.scss';

const INITIAL_STATE = { title: '', description: '' };

const TodoForm = ({ addNewTodo }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [inputError, setInputError] = useState(false);

  const handleChange = evt => {
    const { id, value } = evt.target;

    setState(prevState => ({ ...prevState, [id]: value }));
    setInputError(false);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (state.title.trim() === '' || state.description.trim() === '') {
      setInputError(true);

      return;
    }
    addNewTodo({ ...state });
    setState({ ...INITIAL_STATE });
  };

  const { title, description } = state;

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="title" className={styles.label}>
          Title:
        </label>
        <input
          onChange={handleChange}
          id="title"
          type="text"
          className={inputError && !title ? styles.inputError : styles.input}
          placeholder="Write title of todo here..."
          value={title}
        />
        {inputError && !title && (
          <p className={styles.error}>The field is empty</p>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="description" className={styles.label}>
          Description:
        </label>
        <input
          onChange={handleChange}
          id="description"
          type="text"
          placeholder="Write description here..."
          value={description}
          className={
            inputError && !description ? styles.inputError : styles.input
          }
        />
        {inputError && !description && (
          <p className={styles.error}>The field is empty</p>
        )}
      </div>
      <div>
        <button type="submit" value="Add to list" className={styles.formBtn}>
          Create
        </button>
      </div>
    </form>
  );
};

export default TodoForm;

TodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
