import React, { useEffect } from 'react';
import '../styles.css';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, toggleModal }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') toggleModal();
    };

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [toggleModal]);

  const overlayClick = e => {
    if (e.target === e.currentTarget) toggleModal();
    return;
  };

  return createPortal(
    <div className="Overlay" onClick={overlayClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
