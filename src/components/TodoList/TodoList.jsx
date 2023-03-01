import PropTypes from 'prop-types';
import styles from './TodoList.module.scss';

const TodoList = ({ todos, refreshStatus, showModal }) => {
  const allTodos = todos.map(({ title, description, isDone }, index) => (
    <tr
      key={index}
      id={index}
      className={styles.tr}
      onClick={event => showModal(event, index)}
    >
      <td className={styles.tdId}>{index + 1}.</td>
      <td className={styles.td}>{title}</td>
      <td className={styles.td}>
        <div className={styles.inner}>{description}</div>
      </td>
      <td className={styles.status}>
        <input
          type="checkbox"
          onChange={() => refreshStatus(index)}
          checked={isDone ? true : false}
          id={index}
        />
      </td>
    </tr>
  ));
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.tdId}>ID</th>
            <th className={styles.td}>TITLE</th>
            <th className={styles.td}>DESCRIPTION</th>
            <th className={styles.status}>STATUS</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>{allTodos}</tbody>
      </table>
    </>
  );
};

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    })
  ),
};
