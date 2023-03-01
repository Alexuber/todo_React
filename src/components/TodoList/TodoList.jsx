import styles from './TodoList.module.scss';

const TodoList = ({ todos, refreshStatus, showModal }) => {
  const allTodos = todos.map(({ title, description, isDone }, index) => (
    <tr key={index} id={index} className={styles.tr}>
      <td className={styles.td} onClick={() => showModal(index)}>
        {index + 1}.
      </td>
      <td className={styles.td} onClick={() => showModal(index)}>
        {title}
      </td>
      <td className={styles.td} onClick={() => showModal(index)}>
        {description}
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
            <th className={styles.td}>ID</th>
            <th className={styles.td}>Title</th>
            <th className={styles.td}>Description</th>
            <th className={styles.status}>Status</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>{allTodos}</tbody>
      </table>
    </>
  );
};

export default TodoList;
