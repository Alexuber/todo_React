import styles from './ModalContent.module.scss';

const ModalContent = ({
  onClick,
  refreshStatus,
  id,
  isDone,
  description,
  title,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <div>
          <h2 className={styles.descTitle}>Description:</h2>
          <p className={styles.descText}>{description}</p>
        </div>
        <label htmlFor="status" className={styles.label}>
          Status:
        </label>
        <input id="status" type="checkbox" onChange={() => refreshStatus(id)} />
        <button type="button" onClick={onClick} className={styles.btn}>
          Close
        </button>
      </div>
    </>
  );
};

export default ModalContent;
