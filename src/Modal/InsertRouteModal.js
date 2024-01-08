// Modal.js
import React, { useState } from 'react';
import './Modal.css';

const InsertRouteModal = ({ isOpen, title, onConfirm, onCancel }) => {
    const [routeDescription, setRouteDescription] = useState('');
    const [pageName, setPageName] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleOnConfirm = () => {
        onConfirm(`<br><strong>■ ${routeDescription}(${pageName})</strong></br>`);
    }

    return (
        <div className="modal">
        <div className="modal-content">
            <h2>{title}</h2>
            <label>
                <p style={{textAlign: 'left'}}>설명:</p>
                <input
                    type="text"
                    value={routeDescription}
                    onChange={(e) => setRouteDescription(e.target.value)}
                />
            </label>
            <label>
                <p style={{textAlign: 'left'}}>페이지:</p>
                <input
                    type="text"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                />
            </label>
            <div className="modal-buttons">
            <button onClick={handleOnConfirm}>확인</button>
            <button onClick={onCancel}>취소</button>
            </div>
        </div>
        </div>
    );
};

export default InsertRouteModal;
