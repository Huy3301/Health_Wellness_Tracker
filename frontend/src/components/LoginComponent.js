import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';

const LoginComponent = ({ }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(userName, passwordHash) {
        try {
            const validationStatus = await fetch(`http://localhost:5147/api/Login?userName=${userName}&passwordHash=${passwordHash}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .catch(err => console.error('Login failed:', err));

            if (validationStatus === true) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/Dashboard');
                window.location.reload();
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error('Login failed:', err)
        }
    };

    function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userName = formData.get('userName');
        const passwordHash = SHA256(formData.get('password')).toString();
        handleLogin(userName, passwordHash);
    }

    return (
        <div className="row justify-content-center pt-5">
            <form method="post" onSubmit={onSubmit} className="col-5 m-3">
                <h2 className="text-center"><b>Login</b></h2>
                <div className="row m-3">
                    <label htmlFor="userName" className="col-auto">Username</label>
                    <input type="text" name="userName" className="form-control" aria-label="Username" required />
                </div>
                <div className="row m-3">
                    <label htmlFor="password" className="col-auto">Password</label>
                    <input type="password" name="password" className="form-control" aria-label="Password" required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="row justify-content-center m-3">
                    <button type="submit" className="col-3 btn btn-primary">Login</button>
                </div>
                <div className="row col-auto text-center">
                    <Link to="/Register"><i>Don't have an Account? Register for an account</i></Link>
                </div>
            </form>
        </div>
    )
}


export default LoginComponent