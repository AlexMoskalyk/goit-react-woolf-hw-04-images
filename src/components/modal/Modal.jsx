import React, { useCallback, useEffect } from 'react';
import '../styles.css';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, toggleModal }) => {
  const closeModal = useCallback(
    e => {
      if (e.code === 'Escape') toggleModal();
      if (e.target === e.currentTarget) toggleModal();
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return createPortal(
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
