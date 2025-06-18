import { useState, useEffect } from 'react';
import './StepTracker.css';

export default function StepTracker({ guest }) {
    const goal = 10000;
    const [steps, setSteps] = useState(0);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (guest) {
            const saved = parseInt(localStorage.getItem('stepTracker') || '0');
            if (!isNaN(saved)) setSteps(saved);
        }
    }, [guest]);

    useEffect(() => {
        if (guest) {
            localStorage.setItem('stepTracker', String(steps));
        }
    }, [guest, steps]);

    const percentage = Math.min((steps / goal) * 100, 100);

    const addSteps = () => {
        const value = parseInt(input);
        if (!isNaN(value) && value > 0) {
            setSteps(prev => prev + value);
            setInput('');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 text-center shadow-sm">
                <h3>Step Tracker</h3>
                <div className="progress mb-3" style={{ height: '25px' }}>
                    <div className="progress-bar" style={{ width: `${percentage}%` }}>
                        {steps} / {goal}
                    </div>
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Add steps"
                    />
                    <button className="btn btn-primary" onClick={addSteps}>
                        Add
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => setSteps(0)}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}