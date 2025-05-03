import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';  // Import login function (no SHA256)

const LoginComponent = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { user } = await login(email, password); 
            onLogin(user);  // Update App state
            navigate('/dashboard'); // Redirect on success
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="row justify-content-center pt-5">
            <form method="post" onSubmit={handleLogin} className="col-5 m-3">
                <h2 className="text-center"><b>Login</b></h2>
                <div className="row m-3">
                    <label htmlFor="Email" className="col-auto">Email</label>
                    <input type="email" name="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="row m-3">
                    <label htmlFor="Password" className="col-auto">Password</label>
                    <input type="password" name="password" className="form-control" onChange={e => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="row justify-content-center m-3">
                    <button type="submit" className="col-3 btn btn-primary">Login</button>
                </div>
                <div className="row col-auto text-center">
                    <Link to="/register"><i>Don't have an Account? Register</i></Link>
                </div>
            </form>
        </div>
    );
};

export default LoginComponent;
