import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';

const LoginComponent = ({ }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { user } = await login(email, password);
            onLogin(user);
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
                    <input type="text" name="email" className="form-control" aria-label="Email" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="row m-3">
                    <label htmlFor="password" className="col-auto">Password</label>
                    <input type="password" name="password" className="form-control" aria-label="Password" onChange={e => setPassword(SHA256(e.target.value).toString())} required />
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