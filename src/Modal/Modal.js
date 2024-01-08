// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, title, content, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
