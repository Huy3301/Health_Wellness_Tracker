import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import { signUp } from '../utils/auth';

const RegisterComponent = ({ }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            onRegistered(email);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="row justify-content-center pt-5">
            <form method="post" onSubmit={handleSignUp} className="col-5 m-3">
                <h2 className="text-center"><b>Register</b></h2>
                <div className="row m-3">
                    <label htmlFor="Email" className="col-auto">Email</label>
                    <input type="text" name="email" className="form-control" aria-label="Email" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="row m-3">
                    <label htmlFor="password" className="col-auto">Password</label>
                    <input type="password" name="password" className="form-control" aria-label="Password" onChange={e => setPassword(SHA256(e.target.value).toString())} required />
                </div>
                {/*<div className="row m-3">*/}
                {/*    <label htmlFor="password" className="col-auto">Confirm Password</label>*/}
                {/*    <input type="password" name="password" className="form-control" aria-label="Password" required />*/}
                {/*</div>*/}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="row justify-content-center m-3">
                    <button type="submit" className="col-3 btn btn-primary">Register</button>
                </div>
                <div className="row col-auto text-center">
                    <Link to="/Login"><i>Already have an Account? Login</i></Link>
                </div>
            </form>
        </div>
    )
}


export default RegisterComponent