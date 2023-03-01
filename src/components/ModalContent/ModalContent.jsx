import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalContent.module.scss';

const ModalContent = ({
  onClick,
  refreshStatus,
  id,
  isDone,
  description,
  title,
}) => {
  const [checked, setChecked] = useState(isDone);

  const handleChange = id => {
    setChecked(prevState => {
      return !prevState;
    });
    refreshStatus(id);
  };

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
        <input
          id="status"
          type="checkbox"
          onChange={() => handleChange(id)}
          checked={checked}
        />
        <button type="button" onClick={onClick} className={styles.btn}>
          Close
        </button>
      </div>
    </>
  );
};

export default ModalContent;

ModalContent.propTypes = {
  onClick: PropTypes.func.isRequired,
  refreshStatus: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
