import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ hideModal, children }) => {
  const closeModal = event => {
    const { target, currentTarget, code } = event;
    if (target === currentTarget || code === 'Escape') {
      hideModal(event);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  });

  return createPortal(
    <div className={styles.Overlay} onClick={event => closeModal(event)}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};
