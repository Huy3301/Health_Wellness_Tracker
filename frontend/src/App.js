import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ConfirmForm from './components/RegisterConfirm';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from './cognitoConfig';
import { logout } from './utils/auth';
//import { useAuth } from "react-oidc-context"; Remove

const userPool = new CognitoUserPool(poolData);

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [guest, setGuest] = useState(false);

    useEffect(() => {
        const currentUser = userPool.getCurrentUser();
        if (currentUser) {
            currentUser.getSession((err, session) => {
                if (!err && session.isValid()) {
                    setUser(currentUser);
                } else {
                    setUser(null);
                }
            });
        } else {
            setShowLoginPrompt(true);
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        setGuest(false);
        navigate('/login');
    };

    const handleGuestAccess = () => {
        setGuest(true);
        setShowLoginPrompt(false);
    };

    const handleLoginRedirect = () => {
        setShowLoginPrompt(false);
        navigate('/login');
    };

    return (
        <div className="App">
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm" style={{ minHeight: '18vh' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-white mt-1" to="/"><b>Health Wellness Tracker</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <div className="navbar-nav flex-grow-1">
                            <Link className="nav-link text-white" to="/home">Home</Link>
                            {user && <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>}
                        </div>
                        <div className="navbar-nav login px-3 rounded">
                            {user ? (
                                <button onClick={handleLogout}>Sign out</button>
                            ) : (
                                <button onClick={handleLoginRedirect}>Sign in</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {showLoginPrompt && (
                <LoginPrompt
                    onLogin={handleLoginRedirect}
                    onContinueAsGuest={handleGuestAccess}
                />
            )}

            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard guest={guest} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginComponent onLogin={setUser} />} />
                <Route path="/register" element={<RegisterComponent onRegistered={setRegisteredEmail} />} />
                <Route path="/confirm" element={<ConfirmForm email={registeredEmail} />} />
            </Routes>
        </div>
    );
}

export default App;
