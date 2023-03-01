import styles from './TodoList.module.scss';

const TodoList = ({ todos, refreshStatus, showModal }) => {
  const allTodos = todos.map(({ title, description, isDone }, index) => (
    <tr key={index} id={index} className={styles.tr}>
      <td className={styles.tdId} onClick={() => showModal(index)}>
        {index + 1}.
      </td>
      <td className={styles.td} onClick={() => showModal(index)}>
        {title}
      </td>
      <td className={styles.td} onClick={() => showModal(index)}>
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
