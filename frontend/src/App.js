import './App.css';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from './cognitoConfig';
import { logout } from './utils/auth';
//import { useAuth } from "react-oidc-context"; Remove

const userPool = new CognitoUserPool(poolData);

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/login');
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="App">
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm" style={{ minheight: '18vh' }}>
                <div className="container-fluid">
                    {/*<Link className="m-2" to="/"><img src={logo} className="App-logo" alt="logo" /></Link>*/}
                    <Link className="navbar-brand text-white mt-1" to="/"><b>Health Wellness Tracker</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <div className="navbar-nav flex-grow-1">
                            <Link className="nav-link text-white" to="/Home">Home</Link>
                            <Link className={`nav-link`} to="/Dashboard">Dashboard</Link>
                            {/*${!isLoggedIn ? 'text-muted disabled' : 'text-white'}*/}
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
            <Outlet />
        </div>
    );
}

export default App;

