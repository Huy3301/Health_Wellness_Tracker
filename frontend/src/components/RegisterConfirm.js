import { useState } from 'react';
import { confirmSignUp } from '../utils/auth';

export default function ConfirmForm({ email, onConfirmed }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            await confirmSignUp(email, code);
            onConfirmed();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="row justify-content-center pt-5">
            <form method="post" onSubmit={handleConfirm} className="col-5 m-3">
                <h2 className="text-center"><b>Confirm Email</b></h2>
                <div className="row m-3">
                    <label htmlFor="Email" className="col-auto">Confirm Email</label>
                    <input type="text" placeholder="Verification Code" onChange={e => setCode(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="row justify-content-center m-3">
                    <button type="submit" className="col-3 btn btn-primary">Confirm</button>
                </div>
            </form>
        </div>
}
