import { useState, useEffect } from 'react';
import './WaterIntakeTracker.css'; 

export default function WaterIntakeTracker({ guest }) {
    const maxGlasses = 8;
    const [glasses, setGlasses] = useState(0);

    // Load saved progress in guest mode
    useEffect(() => {
        if (guest) {
            const saved = parseInt(localStorage.getItem('waterTracker') || '0');
            if (!isNaN(saved)) {
                setGlasses(saved);
            }
        }
    }, [guest]);

    // Persist progress when guest mode is active
    useEffect(() => {
        if (guest) {
            localStorage.setItem('waterTracker', String(glasses));
        }
    }, [guest, glasses]);


    const percentage = (glasses / maxGlasses) * 100;

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm text-center">
                <h3>Water Intake</h3>
                <div className="glass-container mx-auto mb-3">
                    <div
                        className="water"
                        style={{ height: `${percentage}%` }}
                    ></div>
                    <div className="glass-overlay">
                        <span className="glass-count">{glasses}/{maxGlasses}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => glasses < maxGlasses && setGlasses(glasses + 1)}
                    >
                        Add Glass
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setGlasses(0)}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
