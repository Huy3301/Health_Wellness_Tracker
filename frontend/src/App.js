import './App.css';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        navigate('/');
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
                            <Link className={`nav-link ${!isLoggedIn ? 'text-muted disabled' : 'text-white'}`} to="/Dashboard">Dashboard</Link>
                        </div>
                        <div className="navbar-nav login px-3 rounded">
                            {isLoggedIn ? (
                                <Link className="nav-link" to="/" style={{ color: '#15425D' }} onClick={handleLogout}>
                                    Logout
                                </Link>
                            ) : (
                                <Link className="nav-link" to="/Login" style={{ color: '#15425D' }}>
                                    Login
                                </Link>
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

