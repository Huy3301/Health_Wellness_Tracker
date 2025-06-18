import React from 'react';

const LoginPrompt = ({ onLogin, onContinueAsGuest }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Welcome to Health Wellness Tracker</h3>
                <p>Would you like to log in or continue as a guest?</p>
                <div className="row justify-content-center">
                    <button onClick={onLogin} className="btn btn-primary m-2 col-8">Log In</button>
                    <button onClick={onContinueAsGuest} className="btn btn-secondary m-2 col-8">Continue as Guest</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPrompt;
