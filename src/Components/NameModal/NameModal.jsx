import React, { useState } from 'react';
import './nameModal.css';
import axios from 'axios';

const Modal = ({ isOpen, onClose, setWish }) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/getWish`, {
                name: name
            });
            const { wish } = response.data;
            setWish(wish);
        } catch (error) {
            console.log("error", error);
            setWish(`Wishing you a very Happy Diwali, ${name}! May your home be filled with the light of happiness, prosperity, and love. May this festival bring you joy, success, and many blessings. 🪔✨`);
        } finally {
            setIsLoading(false); // Stop loading
            onClose();
            setName('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Enter Your Name</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="close-icon" onClick={onClose}>
                        <path d="M12 10.586l4.243-4.243 1.414 1.414L13.414 12l4.243 4.243-1.414 1.414L12 13.414l-4.243 4.243-1.414-1.414L10.586 12 6.343 7.757l1.414-1.414z" />
                    </svg>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="modal-input"
                    />
                    <button type="submit" className="modal-submit" disabled={!name || isLoading}>
                        {isLoading ? (
                            <span className="loader"></span>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
