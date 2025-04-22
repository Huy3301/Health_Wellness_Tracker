import './App.css';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

function App() {
    const navigate = useNavigate();
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "3ei4q1kkcbu1dgkutonaubm9ut";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://ap-southeast-2f3ntzmmts.auth.ap-southeast-2.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

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
                            {auth.isAuthenticated ? (
                                <button onClick={() => signOutRedirect()}>Sign out</button>
                            ) : (
                                <button onClick={() => auth.signinRedirect()}>Sign in</button>
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

