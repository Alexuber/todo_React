import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ hideModal, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, []);

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      hideModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={closeModal}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};
