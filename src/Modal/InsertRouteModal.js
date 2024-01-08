// Modal.js
import React, { useState, useEffect } from 'react';
import './Modal.css';

const InsertRouteModal = ({ isOpen, title, onConfirm, onCancel }) => {
    const [routeDescription, setRouteDescription] = useState('');
    const [pageName, setPageName] = useState('');

    useEffect(() => {
        setRouteDescription('');
        setPageName('');
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleOnConfirm = () => {
        onConfirm(`<br><strong>■ ${routeDescription}(${pageName})</strong></br>`);
    }

    const handleOnCancel = () => {
        onCancel();
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            handleOnConfirm();
        }
    };

    return (
        <div className="modal">
        <div className="modal-content">
            <h2>{title}</h2>
            <label>
                <p style={{textAlign: 'left'}}>설명:</p>
                <input
                    type="text"
                    value={routeDescription}
                    onInput={(e) => setRouteDescription(e.target.value)}
                    onKeyDown={handleEnter}
                />
            </label>
            <label>
                <p style={{textAlign: 'left'}}>페이지:</p>
                <input
                    type="text"
                    value={pageName}
                    onInput={(e) => setPageName(e.target.value)}
                    onKeyDown={handleEnter}
                />
            </label>
            <div className="modal-buttons">
                <button onClick={handleOnConfirm}>확인</button>
                <button onClick={handleOnCancel}>취소</button>
            </div>
        </div>
        </div>
    );
};

export default InsertRouteModal;
